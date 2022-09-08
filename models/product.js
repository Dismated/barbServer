const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

try {
  mongoose.connect(url);
  console.log("connected to MongoDB");
} catch (error) {
  console.log("error connecting to MongoDB:", error.message);
}

const productSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
