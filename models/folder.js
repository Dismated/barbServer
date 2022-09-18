const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    name: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { versionKey: false }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
