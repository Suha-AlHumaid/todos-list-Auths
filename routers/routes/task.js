// addTask

const express = require("express");
const taskRouter = express.Router();


// authentication middelle wear
const authentication = require("../auth/authentication");

//destructuring
const {getAlltasks,getTask, addTask, deleteTask} = require("../controllers/task");

//controllers
taskRouter.get("/tasks", authentication,getAlltasks);
taskRouter.get("/task/:id", authentication,  getTask);
taskRouter.post("/task", authentication,  addTask);
taskRouter.delete("/task", authentication, deleteTask);


module.exports = taskRouter;
