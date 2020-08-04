const comment = require("../models/comment")
//function for comment on post
exports.addcomment =(req, res) => {

    console.log(req.body.user_id)
    var mydata = new comment(req.body);
        mydata.save().then(function( ){
                res.send("comment has been added")
            }).catch(function(e){
                res.send(e)
            })
    
}
exports.getCommentByPostId =(req, res) => {
    comment.find({post_id:req.params.id}).populate('user_id').populate('post_id').then(function(findAllcomment) {
        res.send(findAllcomment).catch(function(e){
            res.json(e)
        })
      })
}

