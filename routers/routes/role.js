const express = require("express");
const roleRouter = express.Router();

//destructuring
const { createRole ,getAllRoles} = require("../controllers/role");

//controllers
roleRouter.post("/createRole", createRole);
roleRouter.get("/getAllRoles", getAllRoles);

module.exports = roleRouter;
