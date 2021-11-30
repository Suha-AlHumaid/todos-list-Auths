// addTask

const express = require("express");
const taskRouter = express.Router();

//destructuring
const {getAlltasks, addTask, deleteTask} = require("../controllers/task");

//controllers
taskRouter.get("/tasks", getAlltasks)
taskRouter.post("/task/:id", addTask);
taskRouter.delete("/task/:id", deleteTask);


module.exports = taskRouter;
