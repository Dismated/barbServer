const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

try {
  mongoose.connect(url);
  console.log("connected to MongoDB");
} catch (error) {
  console.log("error connecting to MongoDB:", error.message);
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
