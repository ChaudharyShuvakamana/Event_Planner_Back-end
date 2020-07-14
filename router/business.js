const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/BusinessController")

const BbusinessController = require("../controller/BbusinessController")

router.post("/postbooking",BbusinessController.addcomment)
router.get("/getbookingbybusinessid/:id",BbusinessController.getCommentByPostId)

router.post("/createbusiness",[upload],postController.addpost)
router.get("/findbusiness",postController.findpost)
router.get("/findbusinessById/:_id",postController.findpostById)
router.get("/findbusinessbyuserid/:_id",postController.findPostByUserId)
router.delete("/deletebusiness/:id",postController.deleteById)
router.put("/businessupdate/:id",postController.updatepost)
router.get("/singleFeed2/:id",postController.getSingleFeed)


module.exports = router