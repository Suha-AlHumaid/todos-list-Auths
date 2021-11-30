// addTask

const express = require("express");
const taskRouter = express.Router();


// authentication middelle wear
const authentication = require("../auth/authentication");

//destructuring
const {getAlltasks,getTask, addTask, deleteTask,updateTask} = require("../controllers/task");

//controllers
taskRouter.get("/tasks", authentication,getAlltasks);
taskRouter.get("/task/:id", authentication,  getTask);
taskRouter.post("/task", authentication,  addTask);
taskRouter.delete("/task/:_id", authentication, deleteTask);
taskRouter.put("/task/:_id", authentication, updateTask);

module.exports = taskRouter;
