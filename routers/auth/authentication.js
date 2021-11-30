const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  try {
    //case: token isn't exist
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }
    //case: token exist
    const token = req.headers.authorization.split(" ")[1];
    // verify token then set it as key in request header object
    const parssedToken = jwt.verify(token, process.env.secert_key);
    req.suha = parssedToken;

    next();
  } catch (error) {
    res.status(403).json(err);
  }
};

module.exports = authentication;
