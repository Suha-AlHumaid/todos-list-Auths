const taskModel = require("../../db/models/task");
const userModel = require("../../db/models/user");

//get all tasks (not deleted)
const getAlltasks = (req, res) => {
  const _id = req.suha._id;

  userModel
    .findById({ _id })
    .then((result) => {
      taskModel.find({ user: result._id }).then((result) => {
        const filtered = result.filter((elem) => elem.isDele === false);
        if (filtered.length !== 0) {
          res.status(200).json(filtered);
        } else {
          res.status(400).json("There is no tasks to show");
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
    .find({ _id: userId })
    .then((user) => {
      if (user) {
        taskModel
          .findById({ _id: id })
          .then((result) => {
            if (result.isDele===false) {
              res.status(200).json(result);
            }
            res.status(400).json("There is no taske to show");
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(400).json("user dose not exist");
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
        res.status(200).json(newTask);
        // userModel.findById({ _id: newTask.user }).then(
        //     result =>{

        //         result.tasks.push(newTask);
        //         console.log(result.tasks);
        //         result.save();
        //         res.status(200).json(result.tasks);
        //     }
        // )
      } else {
        res.status(400).json("user dose not exist");
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
        userModel.findById({_id: id}).then(result=>{
        
                taskModel
                .findByIdAndUpdate({ _id },{isDele:true})
                .then((result) => {
                    console.log(result);
                    if(result.isDele == false){
                    res.status(200).json(result);
                  } else {
                    res.status(404).json("deleted already");
                  }
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            
            // else {
            //     res.status(404).json("task already deleted");
            // }
   
        }).catch((err)=>{
            res.status(400).json(err);
        })
      
    } catch (error) {
        res.status(400).json(error);
    }

};

module.exports = { getAlltasks, getTask, addTask, deleteTask };
