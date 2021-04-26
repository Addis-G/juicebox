const express = require("express");
const getAllTags = require("../db/posts/tags/getAllTags.js");
const getPostByTagName = require("../db/posts/getPostsByTagName.js");

const tagsRouter = express.Router();

tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({ tags });
  } catch (erro) {
    console.log(error);
  }
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allPosts = await getPostByTagName(tagName);
    posts = allPosts.filter(
      (post) =>
        (post.active && post.author.active) ||
        (req.user && req.user.id == post.author.id)
    );
    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
