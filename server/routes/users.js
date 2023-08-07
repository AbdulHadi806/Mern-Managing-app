const express = require("express");
const { getUserInfo, updateUser } = require("../controller/user-controller");
const UserRoutes = express.Router();

UserRoutes.get("/info", getUserInfo)
UserRoutes.put("/info", updateUser)

module.exports = UserRoutes;