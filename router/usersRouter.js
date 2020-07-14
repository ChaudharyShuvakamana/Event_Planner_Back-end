const express = require("express");
const router = express.Router();
const Users = require('../models/Users')
const auth = require('../middleware/auth');
const UserController = require('../controller/usersController')
const upload = require('../controller/uploadfile');

router.post("/userregister",UserController.adduser)

router.post("/userlogin", UserController.login)

router.get("/userlogincheck",auth,UserController.logincheck)

router.get("/userurs",UserController.finduser)

router.get("/userprofile/:_id",UserController.profile)

router.delete("/userdel/:id",UserController.delete)

router.put("/userupdates/:id",UserController.update)

router.post("/userlogout",auth,UserController.logout)

router.put("/upload/:id",[upload],UserController.updates)

router.get("/admin_dashboard",auth,UserController.admin)






module.exports = router