const post = require("../models/business")

//function for adding post
exports. addpost =(req, res) => {
    
        console.log(req.body)
        console.log(req.files)
        req.files.map(function(items){
            const Post = new post({
                user_id:req.body.user_id,
                businesstype:req.body.businesstype,
                image:items.filename,
                businessname:req.body.businessname,
                phone:req.body.phone,
                address: req.body.address,
                email:req.body.email,
                price:req.body.price,
                description:req.body.description,
               
            }
            
            )
                Post.save().then(function( ){
                    res.send("post has been added")
                }).catch(function(e){
                    res.send(e)
                })

        })
        
    }

     
    //function for getting post
exports.findpost= async(req, res) => {
   post.find().populate('user_id').then(function(findAllpost) {
       
        res.send(findAllpost).catch(function(e){
            res.send(e)
        })
      })
  }
     
    //function for getting post
exports.findPostByUserId= async(req, res) => {
    console.log(req.params._id)
       post.find({user_id:req.params._id}).populate('user_id').then(function(findAllpost) {
        res.send(findAllpost).catch(function(e){
            res.send(e)
        })
      })
  }
    //function for getting post by id
exports.findpostById= (req, res) => {
    post.findById(req.params._id)
    .then(function(postById) {
        res.send(postById).catch(function(e){
            res.send(e)
        })
      })
  }

  exports.deleteById = (function(req,res){
    post.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted");
    }).catch(function(){
        res.send(e)
    })
});

exports.updatepost = (function(req, res) {
    post.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
})

exports.getSingleFeed = (function(req, res) {
    console.log(req.params.id);
    
    post.findById(req.params.id).then(function (response) {
        console.log(response);
        
        res.send({singleFeed:response})
    }).catch(function (e) {
        res.send(e)
    })
})