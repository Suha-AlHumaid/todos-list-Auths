const express = require("express");
const userRouter = express.Router();

//destructuring
const { register, login, deleteUser,getAllUser } = require("../controllers/user");

//controllers
userRouter.post("/register", register);
userRouter.post("/login", login);

//only admin can delete
userRouter.delete("/user/:id", deleteUser);
//only admin can get all user
userRouter.get("/all", getAllUser);

module.exports = userRouter;
