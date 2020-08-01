const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth');
const bvenueController = require("../controller/BvenueController")
router.post("/postbvenue",bvenueController.addbvenue)
router.get("/getbvenuebypostid/:id",bvenueController.getbvenueByPostId)
router.delete("/delete/bvenuelist/:id",bvenueController.deleteById)