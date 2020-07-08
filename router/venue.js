const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/VenuesController")
router.post("/createpost",[upload],postController.addpost)
router.get("/findpost",postController.findpost)
router.get("/findpostById/:_id",postController.findpostById)
router.get("/findpostbyuserid/:_id",postController.findPostByUserId)
router.delete("/deletepost/:id",postController.deleteById)
router.put("/postupdate/:id",postController.updatepost)
router.get("/singleFeed/:id",postController.getSingleFeed)


module.exports = router