const taskModel = require("../../db/models/task");
const user = require("../../db/models/user");
const userModel = require("../../db/models/user");

//get all tasks 
const getAlltasks =()=>{}

//create new task
const addTask = (req, res) => {
    try {
        const {id}= req.params;
        const { task} = req.body;
        userModel
        .findOne({id}).then((result)=>{
            if (result){
                console.log(result._id);
                const newTask = new taskModel({
                  task, user: result._id
                });
              
                newTask
                  .save()
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
                res.status(400).json("user dose not exist")
            }
    
        })

    } catch{console.error();}

};

//hard delete task
const deleteTask = (req, res) => {
    console.log("delete");
    const {id} = req.params;
    taskModel
      .findOneAndDelete({id})
      .then((result) => {
          if(result){
            res.status(200).json(result);
          }
          else {
            res.status(404).json("not found");
          }
      
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

module.exports = { getAlltasks,addTask ,deleteTask};
