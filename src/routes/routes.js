const { Router } = require("express");
const route = Router();

const { register, login } = require("../controller/auth");
const { addRole } = require("../controller/role");

//auth & User
route.post("/register", register);
route.post("/login", login);

//Role
route.post("/add-role", addRole);

module.exports = route;
