const express = require("express");
const router = express.Router();
const vendors = require('../models/Vendor')
const auth = require('../middleware/auth');
const vendorController = require('../controller/vendorController');

router.post("/register",vendorController.addvendor)
router.post("/login",vendorController.login)
router.post("/checkemail",vendorController.checkEmailAvailabilityser)



module.exports = router
