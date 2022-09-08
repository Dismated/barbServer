const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Product = require("./models/product");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/api/products", async (request, response, next) => {
  try {
    const products = await Product.find({});
    response.json(products);
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:id", async (request, response, next) => {
  try {
    const product = await Product.findById(request.params.id);
    if (product) {
      response.json(product);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/products", (request, response, next) => {
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const product = new Product(body);

  try {
    const savedProduct = product.save();
    response.json(savedProduct);
  } catch (error) {
    next(error);
  }
});
app.put("/api/products/:id", async (request, response, next) => {
  const body = request.body;

  const product = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedProduct = awaitNote.findByIdAndUpdate(
      request.params.id,
      product,
      { new: true }
    );
    response.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/products/:id", (request, response, next) => {
  try {
    Product.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
