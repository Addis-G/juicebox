const express = require("express");

const getAllUsers = require("../db/users/getAllUsers.js");

const register = require("./register.js");
const login = require("./login.js");
const deleteUser = require("./userDeleteAPI.js");
const reActivateUser = require("./reActivateUserAPI.js");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/login", login);

usersRouter.post("/register", register);

usersRouter.patch("/:userId", reActivateUser);

usersRouter.delete("/:userId", deleteUser);

module.exports = usersRouter;
