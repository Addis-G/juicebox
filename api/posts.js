const getAllPosts = require("../db/posts/getAllPosts.js");
const createPostAPI = require("./createPostAPI.js");
const updatePostAPI = require("./updatePostAPI.js");
const deletePostAPI = require("./deletePostAPI.js");
const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./requireUser.js");
const requireActiveUser = require("./requireActiveUser.js");

postsRouter.post("/", requireUser, requireActiveUser, createPostAPI);

postsRouter.patch("/:postId", requireUser, requireActiveUser, updatePostAPI);

postsRouter.delete("/:postId", requireUser, requireActiveUser, deletePostAPI);

postsRouter.get("/", async (req, res, next) => {
  try {
    const allPosts = await getAllPosts();

    posts = allPosts.filter(
      (post) =>
        (post.active && post.author.active) ||
        (req.user && post.author.id == req.user.id)
    );

    res.send({ posts });

    next();
  } catch (error) {
    console.log(error);
  }
});

module.exports = postsRouter;
