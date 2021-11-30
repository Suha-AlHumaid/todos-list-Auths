const express = require("express");
const userRouter = express.Router();

const authentication = require("../auth/authentication");

//destructuring
const { register, login, deleteUser,getAllUser } = require("../controllers/user");

//controllers
userRouter.post("/register", register);
userRouter.post("/login", login);

//only admin can delete
userRouter.delete("/user/:id", deleteUser);
//only admin can get all user
userRouter.get("/all",authentication, getAllUser);

module.exports = userRouter;
