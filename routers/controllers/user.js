const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/role");
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
              const options={
                expiresIn: 60*60
              }
            const token = jwt.sign({ role: result.role }, process.env.secert_key ,options);
            res.status(200).json({result,token});
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

module.exports = { register, login };
