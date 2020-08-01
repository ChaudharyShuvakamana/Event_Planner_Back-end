const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth');
const BbusinessController = require("../controller/BbusinessController")
router.post("/postbooking",BbusinessController.addbbusiness)
router.get("/getbookingbybusinessid/:id",BbusinessController.getbbusinessByPostId)