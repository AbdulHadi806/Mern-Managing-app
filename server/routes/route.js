const express = require("express");
const TaskRoutes = require("./tasks");
const AuthRoutes = require("./auth");
const { checkAuth } = require("../utils/checkAuth");
const UserRoutes = require("./users");
const Routes = express.Router();

Routes.use('/tasks', checkAuth,TaskRoutes)
Routes.use('/auth', AuthRoutes)
Routes.use('/me', checkAuth,UserRoutes)
// Routes.get("/login", sendLoginUser)

module.exports = Routes;