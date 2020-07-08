const express = require("express");
const router = express.Router();
const Users = require('../models/user')
const auth = require('../middleware/auth');
const UserController = require('../controller/userController')
const upload = require('../controller/uploadfile');

router.post("/register",UserController.adduser)

router.post("/login", UserController.login)

router.get("/logincheck",auth,UserController.logincheck)

router.get("/urs",UserController.finduser)

router.get("/profile/:_id",UserController.profile)

router.delete("/del/:id",UserController.delete)

router.put("/updates/:id",UserController.update)

router.post("/logout",auth,UserController.logout)

router.put("/upload/:id",[upload],UserController.updates)

router.get("/admin_dashboard",auth,UserController.admin)






module.exports = router