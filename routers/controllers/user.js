const userModel = require("../../db/models/user");
const taskModel = require("../../db/models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const SALT = Number(process.env.SALT);
  const hashedPass = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: savedEmail,
    password: hashedPass,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == savedEmail) {
          const newpass = await bcrypt.compare(password, result.password);
          if (newpass) {
            const options = {
              expiresIn: 60 * 60,
            };
            const token = jwt.sign(
              { role: result.role ,
              _id : result._id},
              process.env.secert_key,
              options
            );
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Invalaid password  or email");
          }
        } else {
          res.status(400).json("Invalaid password or email");
        }
      } else {
        res.status(400).json("Email does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//delete user and his data
const deleteUser = (req, res) => {
  // const _id = req.suha._id;
  const { id } = req.params;
  // userModel.findById({_id}).then(result=>{


  userModel
  .findByIdAndDelete({ _id: id })
  .then((result) => {
    if (result) {
      console.log(result);
      taskModel
        .deleteMany({ user: result._id })
        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      res.status(400).json("there is no user to delete");
    }
  })
  .catch((err) => {
    res.status(400).json(err);
  });
  // }).catch((error)=>{
  //   res.status(400).json(error);
  // })
};

//get all user
const getAllUser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      }
      res.status(400).json("There is no user to show");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, login, deleteUser, getAllUser };
