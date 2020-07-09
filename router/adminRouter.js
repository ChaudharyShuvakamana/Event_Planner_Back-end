const express = require("express");
const router = express.Router();
const admins = require('../models/Admin')
const auth = require('../middleware/auth');
const adminController = require('../controller/adminController');

router.post("/register",adminController.addadmin)



module.exports = router
