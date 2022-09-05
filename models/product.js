const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

try {
  mongoose.connect(url);
  console.log("connected to MongoDB");
} catch (error) {
  console.log("error connecting to MongoDB:", error.message);
}

const productSchema = new mongoose.Schema({});

module.exports = mongoose.model("Product", productSchema);
