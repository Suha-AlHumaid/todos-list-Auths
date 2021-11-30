// addTask

const express = require("express");
const taskRouter = express.Router();

//destructuring
const { addTask} = require("../controllers/task");

//controllers
taskRouter.post("/task", addTask);


module.exports = taskRouter;
