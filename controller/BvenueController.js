const bvenue = require("../models/bookingvenue")
//function for bvenue on post
exports.addbvenue =(req, res) => {

    console.log(req.body)
    var mydata = new bvenue(req.body);
   
        mydata.save().then(function( ){
                res.send("Venue booked")
            }).catch(function(e){
                res.send(e)
            })
    
}
exports.getbvenueByPostId =(req, res) => {
    bvenue.find({user_id:req.params.id}).populate('user_id').populate('venue_id').then(function(findAllbvenue) {
        res.send(findAllbvenue).catch(function(e){
            res.json(e)
        })
      })
}
exports.findvenuebook= async(req, res) => {
    bvenue.find().populate('user_id').then(function(findAllpost) {
        
         res.send(findAllpost).catch(function(e){
             res.send(e)
         })
       })
   }
   
exports.deleteById = (function(req,res){
    bvenue.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted");
    }).catch(function(){
        res.send(e)
    })
});
exports.updatebvenue = (function(req, res) {
    bvenue.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
})

exports.getSinglebvenue = (function(req, res) {
    console.log(req.params.id);
    
    bvenue.findById(req.params.id).then(function (response) {
        console.log(response);
        
        res.send({singlebvenue:response})
    }).catch(function (e) {
        res.send(e)
    })
})



