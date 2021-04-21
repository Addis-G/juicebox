const express = require("express");
const getAllTags = require("../db/posts/tags/getAllTags.js");

const tagsRouter = express.Router();

tagsRouter.use("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({ tags });
  } catch (erro) {
    console.log(error);
  }
});

module.exports = tagsRouter;
