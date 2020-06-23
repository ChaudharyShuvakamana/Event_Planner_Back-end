const express = require("express");
const router = express.Router();
const Users = require('../models/User')
const auth = require('../middleware/auth');
const UserController = require('../controller/userController');


router.post("/register",UserController.adduser)
router.post('/checkemail', UserController.checkEmailAvailabilityser)



module.exports = router
