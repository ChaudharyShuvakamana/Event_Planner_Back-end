const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/PostsController")
const commentController = require("../controller/CommentController")
router.post("/postcomment",commentController.addcomment)
router.get("/getcommentbypostid/:id",commentController.getCommentByPostId)
router.post("/createblog",[upload],postController.addpost)
router.get("/findblog",postController.findpost)
router.get("/findblogById/:_id",postController.findpostById)
router.get("/findblogbyuserid/:_id",postController.findPostByUserId)
router.delete("/deleteblog/:id",postController.deleteById)
router.put("/blogupdate/:id",postController.updatepost)
router.get("/singleblog/:id",postController.getSingleFeed)


module.exports = router