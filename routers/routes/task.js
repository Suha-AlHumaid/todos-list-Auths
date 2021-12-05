
const express = require("express");
const taskRouter = express.Router();


// authentication middelle wear
const authentication = require("../auth/authentication");
// authentication middelle wear
const authorization = require("../auth/authorization");

//destructuring
const {getAlltasks,getTask, addTask, deleteTask,updateTask,deleteTaskByAdmin, getAlltasksByAdmin} = require("../controllers/task");

//controllers
taskRouter.get("/tasks", authentication ,getAlltasks);
taskRouter.get("/task/:id", authentication,  getTask);
taskRouter.post("/task", authentication,  addTask);
taskRouter.delete("/task/:_id", authentication, deleteTask);
taskRouter.put("/task/:_id", authentication, updateTask);
taskRouter.delete("/taskByAdmin/:_id", authentication,authorization, deleteTaskByAdmin);
taskRouter.get("/tasksByAdmin/:_id", authentication,authorization, getAlltasksByAdmin);
module.exports = taskRouter;
