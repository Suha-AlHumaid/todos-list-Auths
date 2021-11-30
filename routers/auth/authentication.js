const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const parssedToken = jwt.verify(token ,process.env.secert_key)
        req.suha = parssedToken 
       
        next();
    } catch (error) {
        res.status(403).json(err);
    }
}

module.exports = authentication
