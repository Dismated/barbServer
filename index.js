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

app.get("/api/products", async (request, response) => {
  try {
    const products = await Product.find({});
    response.json(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/products/:id", (request, response) => {
  try {
    const product = Product.findById(request.params.id);
    if (product) {
      response.json(product);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/products", (request, response) => {
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const product = new Product(body);

  try {
    const savedProduct = product.save();
    response.json(savedProduct);
  } catch (error) {}
});

app.delete("/api/products/:id", (request, response) => {
  try {
    Product.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log(error);
  }
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
