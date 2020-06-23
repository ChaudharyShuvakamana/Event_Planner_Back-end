const express = require("express");
const router = express.Router();
const admins = require('../models/Admin')
const auth = require('../middleware/auth');
const adminController = require('../controller/adminController');

router.post("/register",adminController.addadmin)
router.post("/login",adminController.login)
router.post("/checkemail",adminController.checkEmailAvailabilityser)


module.exports = router
