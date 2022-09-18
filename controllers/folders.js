const foldersRouter = require("express").Router();
const Folder = require("../models/folder");

foldersRouter.get("/", async (request, response) => {
  const folders = await Folder.find({}).populate("products");
  response.json(folders);
});

foldersRouter.get('/:id', async (request, response) => {
  const folder = await Folder.findById(request.params.id).populate('products')
  if (folder) {
    response.json(folder);
  } else {
    response.status(404).end();
  }
})

foldersRouter.post("/", async (request, response) => {
  const body = request.body;

  const folder = new Folder({ name: body.name });

  const savedFolder = await folder.save();

  response.status(201).json(savedFolder);
});

module.exports = foldersRouter;
