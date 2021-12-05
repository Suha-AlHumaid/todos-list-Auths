const taskModel = require("../../db/models/task");
const userModel = require("../../db/models/user");

//get all tasks (not deleted)
const getAlltasks = (req, res) => {
  const _id = req.suha._id;

  userModel
    .findById({ _id })
    .then((result) => {
      taskModel.find({ user: result._id ,isDele:false}).then((result) => {
        if(result) {
if(result.length!==0){
  console.log(result);
  res.status(200).json(result);
}
else {
  res.status(200).send(result);
}
        }

      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//get task by id
const getTask = (req, res) => {
  const { id } = req.params;
  const userId = req.suha._id;

  userModel
    .findById({ _id: userId })
    .then((user) => {
      if (user) {
        taskModel
          .findById({ _id: id })
          .then((result) => {
            if (result.isDele === false) {
              res.status(200).json(result);
            }
            res.status(404).json("There is no tasks to show");
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(404).json("user dose not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//create new task
const addTask = (req, res) => {
  try {
    const id = req.suha._id;
    const { task } = req.body;

    userModel.findById({ _id: id }).then((result) => {
      if (result) {
        const newTask = new taskModel({
          task,
          user: result._id,
        });
        newTask.save();
        res.status(201).json(newTask);
        // userModel.findById({ _id: newTask.user }).then(
        //     result =>{

        //         result.tasks.push(newTask);
        //         console.log(result.tasks);
        //         result.save();
        //         res.status(200).json(result.tasks);
        //     }
        // )
      } else {
        res.status(404).json("user dose not exist");
      }
    });
  } catch {
    console.error();
  }
};

//soft delete task
const deleteTask = (req, res) => {
  try {
    const id = req.suha._id;
    const { _id } = req.params;
    userModel
      .findById({ _id: id })
      .then((result) => {
        taskModel
          .findOneAndUpdate({ _id, isDele: false }, { isDele: true })
          .then((result) => {
            console.log(result);
            if (result) {
              res.status(200).json(result);
            } else {
              res.status(404).json("Task already deleted");
            }
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

////update task
const updateTask = (req, res) => {
  try {
    const id = req.suha._id;
    const { _id } = req.params;
    const { task } = req.body;
    userModel
      .findById({ _id: id })
      .then((result) => {
        taskModel
          .findByIdAndUpdate({ _id }, { task: task })
          .then((result) => {
            console.log(result);
            if (result.isDele == false) {
              res.status(200).json(result);
            } else {
              res.status(404).json("Task already deleted");
            }
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteTaskByAdmin = (req, res) => {
  try {
    const id = req.suha._id; //admin id
    const { _id } = req.params; //user id
    const { task_id } = req.body; // task id
    userModel
      .findById(_id)
      .then((result) => {
        //user found
        console.log(result);
        if(result){
          taskModel
          .findOneAndUpdate({ _id: task_id, isDele: false }, { isDele: true })
          .then((result) => {
            //task found
            if(result){
              res.status(201).json(result);
            }else {
              res.status(404).json("no tasks");
            }
          
          })
          .catch((err) => {
            res.status(400).json(err);
          });
        }else{
          res.status(404).json("not found user");
        }
    
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
}; 
const getAlltasksByAdmin = (req, res) => {
try {
    const id = req.suha._id; //admin id
    const { _id } = req.params; //user id
    // const { task_id } = req.body; // task id
    userModel
      .findById(_id)
      .then((result) => {
        //user found

        if(result){
          taskModel
          .find({user:_id,isDele:false})
          .then((result) => {
        
            //tasks found
            if(result){
              res.status(201).json(result);
            }else {
              res.status(404).json("no tasks");
            }
          
          })
          .catch((err) => {
            res.status(400).json(err);
          });
        }else{
          res.status(404).json("not found user");
        }
    
      })
      .catch((err) => {
        res.status(400).json(err);
      });
} catch (error) {
  res.status(400).json(error);
}

}
module.exports = {
  getAlltasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
  deleteTaskByAdmin,
  getAlltasksByAdmin,
};
