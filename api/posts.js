const getAllPosts = require("../db/posts/getAllPosts.js");
const express = require("express");
const postsRouter = express.Router();

postsRouter.use(async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.send({ posts });
  } catch (error) {
    console.log(error);
  }
});

module.exports = postsRouter;
