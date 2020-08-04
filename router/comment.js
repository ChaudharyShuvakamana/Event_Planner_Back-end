const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth');
const commentController = require("../controller/CommentController")
router.post("/postcomment",commentController.addcomment)
router.get("/getcommentbypostid/:id",commentController.getCommentByPostId)