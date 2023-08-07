const express = require("express");
const { postUser, loginUser, logOutUser, isLoginIn } = require("../controller/registration-controller");
const AuthRoutes = express.Router();


AuthRoutes.post("/User",  postUser)
AuthRoutes.post("/login", loginUser)
AuthRoutes.get("/logOut", logOutUser)
AuthRoutes.get("/islogin", isLoginIn)

// TaskRoutes.get("/login", sendLoginUser)

module.exports = AuthRoutes;