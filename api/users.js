const express = require("express");

const getAllUsers = require("../db/users/getAllUsers.js");

const usersRouter = express.Router();
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.send({
      users,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = usersRouter;
