const express = require("express");
const userRouter = express.Router();

//destructuring
const { register, login, deleteUser } = require("../controllers/user");

//controllers
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/user/:id", deleteUser);

module.exports = userRouter;
