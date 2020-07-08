const Users = require("../models/user")

//function for adding trip
exports.adduser =(req, res) => {
    const User = new Users(
        req.body)
        User.save().then(function( ){
            res.send("User has been added")
        }).catch(function(e){
            res.send(e)
        })
    }

    //function for Login Function
exports.login = async (req, res) => {
    try{
        const user = await Users.checkCrediantialsDb(req.body.email,
       req.body.password);
       console.log(user)
       if(user!=null){
   const token = await user.generateAuthToken()
   res.json({
       token: token,
       success: true,
       user: user
   });
   console.log("success")
}
else{
   res.json({
       success:false
   })
}
        }
        catch(e){
            res.status(400).send()
        }
    }
//function for login check
exports.logincheck = async(req,res)=>{
    res.send(req.user)
    console.log(req.user)
}

// //get ko lagi code
exports.finduser= async(req, res) => {
    Users.find().then(function (findAlluser) {
        res.send(findAlluser).catch(function(e){
            res.send(e)
        })
      })
  }


exports.profile = (req, res) => {
    Users.findById(req.params._id
    ).then(function (userdetail) {
        res.send(userdetail)
    })
}

//yaha bata taltira delete ko 
exports.delete = function (req, res) {
    Users.findByIdAndDelete(req.params.id).then(function () {

    }).catch(function () {
        res.send(e)
    })
};

exports.update = function (req, res) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
}

// exports.logout = async(req,res)=> {
//     try{
//         req.user.tokens = res.user.tokens.filter((token)=>{
//         return token.token !== req.token
//     })
//     await req.user.save()
//     res.send()
// }
// catch (e) {
//     res.status(500).send
// }
// }


exports.logout= (req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
}

exports.updates = function(req,res){

        req.files.map(function (img) {
            var images = img.filename

            Users.findByIdAndUpdate(req.params.id, { 'file': images }, { upsert: true }, (err, docs) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ error: "unsuccessful" })
                } else {
                    console.log(images)
                    res.send("Profile Picture Update successfull !" + docs)
                }
            })
        })
    }


exports.admin = function(req, res){
    user_type = req.user_type
    if(user_type=="admin"){
        res.send("hello admin")
    }
    else{
        res.send("please authenticate..");
    }
}
