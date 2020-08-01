const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/VenuesController")

const bvenueController = require("../controller/BvenueController")
router.post("/postbvenue",bvenueController.addbvenue)
router.get("/getbvenuebypostid/:id",bvenueController.getbvenueByPostId)
router.delete("/delete/bvenuelist/:id",bvenueController.deleteById)
router.put("/updatebvenue/:id",bvenueController.updatebvenue)
router.get("/singlebvenue/:id",bvenueController.getSinglebvenue)

router.post("/createpost",[upload],postController.addpost)
router.get("/findpost",postController.findpost)
router.get("/findpostById/:_id",postController.findpostById)
router.get("/findpostbyuserid/:_id",postController.findPostByUserId)
router.delete("/deletepost/:id",postController.deleteById)
router.put("/postupdate/:id",postController.updatepost)
router.get("/singleFeed/:id",postController.getSingleFeed)


module.exports = router