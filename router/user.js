const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth');


router.post("/register", (req, res) => {
    console.log(req.body)
    var myData = new User(req.body);
    myData.save();
});

router.get('/user',function(req,res){
    User.find().then(function(user_data){
        res.send(user_data);

    
}).catch(function(e){
    
            res.send(e)
        
    });
})
router.get('/logincheck',auth,async(req,res)=>{
    res.send(req.user)
    console.log(req.user)
})
router.get('/admin_dashboard', auth, function (req, res) {
    user_type = req.user_type
    if (user_type == "admin") {
        res.send("hello admin")
    }
    else {
        res.status(401).send({ error: 'Please authenticate.' })
    }

})

router.get('/user_dashboard', auth, function (req, res) {
    user_type = req.user_type
    if (user_type == "user") {
        res.send("hello user")
    }
    else {
        res.status(401).send({ error: 'Please authenticate.' })
    }

})

router.get("/admin_dashboard", auth, function () {


})



router.delete('/user/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function () {

    }).catch(function () {
        res.send(e)
    })


});

router.put('/user/:id', function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)


    })
})

// router.post("/login22", async function (req, res) {
//     try {
//         console.log(req.body)
//         const user = await User.checkCrediantialsDb(req.body.email, req.body.password)
//         const token = await user.generateAuthToken();
//         res.send({user,token})

//         if (user != null) {
//             res.json({
//                 message: "login success",
//                 status: "true",
//                 email: user.email,
//                 fullname: user.fullname,
//                 user_type: user.user_type,
//                 newtoken: token,
//                 _id: user._id

//             })
//             res.send(user)

//         } else {
//             res.json({
//                 message: "not login success",
//                 status: "false"
//             })
//         }

//     } catch (error) {
//         res.json(error)
//     }

// })


router.post("/login", async function(req, res){

    const user = await User.checkCrediantialsDb(req.body.email,
   req.body.password)
    const token = await user.generateAuthToken()
    res.send({user,token})
   
   })

router.get('/users/single/:id', function(req,res){
    User.findOne({_id :req.params.id}).then(function(user_data){
        res.send(user_data)
    }).catch(function(e){
        res.send(e)
    });
})

router.post('/logout',auth , async(req,res)=> {
    try{
        req.user.tokens = res.user.tokens.filter((token)=>{
        return token.token !== req.token
    })
    await req.user.save()
    res.send()
}
catch (e) {
    res.status(500).send
}
    

})


module.exports = router