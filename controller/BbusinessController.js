const bbusiness = require("../models/bookingbusiness")
//function for bbusiness on post
exports.addbbusiness =(req, res) => {

    console.log(req.body.user_id)
    var mydata = new bbusiness(req.body);
        // const bbusiness = new bbusiness({
        //     user_id:req.body.user_id,
        //     bbusiness:req.body.bbusiness,
        //     post_id:req.body.post_id 
        // }
        // )
        mydata.save().then(function( ){
                res.send("bbusiness has been added")
            }).catch(function(e){
                res.send(e)
            })
    
}
exports.getbbusinessByPostId =(req, res) => {
    bbusiness.find({user_id:req.params.id}).populate('user_id').populate('business_id').then(function(findAllbbusiness) {
        res.send(findAllbbusiness).catch(function(e){
            res.json(e)
        })
      })
}
exports.deleteById = (function(req,res){
    bbusiness.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted");
    }).catch(function(){
        res.send(e)
    })
});
exports.updatebbusiness = (function(req, res) {
    bbusiness.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
})

exports.getSinglebbusiness = (function(req, res) {
    console.log(req.params.id);
    
    bbusiness.findById(req.params.id).then(function (response) {
        console.log(response);
        
        res.send({singlebbusiness:response})
    }).catch(function (e) {
        res.send(e)
    })
})
