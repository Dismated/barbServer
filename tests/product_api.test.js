const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Product = require("../models/product");

const initialProducts = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  await Product.deleteMany({});
  let productObject = new Product(initialProducts[0]);
  await productObject.save();
  productObject = new Product(initialProducts[1]);
  await productObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
