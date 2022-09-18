const productsRouter = require("express").Router();
const Product = require("../models/product");
const Folder = require("../models/folder");

productsRouter.get("/", async (request, response, next) => {
  const products = await Product.find({}).populate("folders");
  response.json(products);
});

productsRouter.get("/:id", async (request, response, next) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.json(product);
  } else {
    response.status(404).end();
  }
});

productsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const folder = await Folder.findById(body.folderId);
  const productDescription = body.content;
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const product = new Product({
    title: productDescription.title,
    image: productDescription.image,
    price: productDescription.price,
    folder: folder,
  });

  const savedProduct = await product.save();
  folder.products = folder.products.concat(savedProduct._id);
  await folder.save();

  response.status(201).json(savedProduct);
});
productsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const product = {
    title: body.title,
    image: body.image,
    price: body.price,
    quantity: body.quantity,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    request.params.id,
    product,
    { new: true, runValidators: true, context: "query" }
  );
  response.json(updatedProduct);
});

productsRouter.delete("/:id", async (request, response, next) => {
  await Product.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = productsRouter;
