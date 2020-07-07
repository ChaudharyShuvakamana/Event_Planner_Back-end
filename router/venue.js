const express = require('express')
const venue = require('../models/venue')
const router = new express.Router()

const path = require('path');
const multer = require('multer');
const app = express();

app.use(express.static(path.join(__dirname, "public/images")))


const storage = multer.diskStorage({
  destination:"public/images",
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + "venuepic" + ext);
    //cb(null, "hello" + ext)
  }
});




const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000000000000000
  }
});


router.post("/venue",upload.single('Img'),(req,res)=>{
   //console.log(req.body.filename)
   var myData = new venue({
     venuename: req.body.venuename,
     venuetype:req.body.venuetype,
     phone:req.body.phone,
     address: req.body.address,
     email:req.body.email,
     description:req.body.description,
     Image:req.file.filename

   });
   myData.save();
});


router.get('/venue',function(req,res){
    venue.find().then(function(user_data){
        res.send(user_data);

    
}).catch(function(e){
    
            res.send(e)
        
    });
})




router.delete('/venue/:id',function(req,res){
    venue.findByIdAndDelete(req.params.id).then(function(){

    }).catch(function(){
        res.send(e)
    })

    
});

router.put('/venue/:id',function(req,res){
    venue.findOneAndUpdate({_id :req.params.id},req.body).then(function(){
        res.send("updated")
    }).catch(function(e){
        res.send(e)
    })
})
router.post('/viewvenue',function(req,res){
  console.log(req.body)
  venue.findById(req.body.venueid).then(function(user_data){
      res.send(user_data);

  
}).catch(function(e){
  
          res.send(e)
      
  });
})

router.get('/venue/single/:id', function(req,res){
  venue.findOne({_id :req.params.id}).then(function(user_data){
      res.send(user_data)
  }).catch(function(e){
      res.send(e)
  });
})

module.exports = router