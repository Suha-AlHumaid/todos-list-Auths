const taskModel = require("../../db/models/task");


//create new task
const addTask = (req, res) => {
  const { task,user } = req.body;

  const newTask = new taskModel({
    task, user
  });

  newTask
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addTask };
