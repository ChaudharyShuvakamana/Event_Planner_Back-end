const express = require('express')
const business = require('../models/business')
const router = new express.Router()

const path = require('path');
const multer = require('multer');
const app = express();

app.use(express.static(path.join(__dirname, "public/images")))


const storage = multer.diskStorage({
  destination:"public/images",
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + "businesspic" + ext);
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


router.post("/business",upload.single('Img'),(req,res)=>{
   //console.log(req.body.filename)
   var myData = new business({
     businessname: req.body.businessname,
     businesstype:req.body.businesstype,
     phone:req.body.phone,
     address: req.body.address,
     price: req.body.price,
     email:req.body.email,
     description:req.body.description,
     Image:req.file.filename

   });
   myData.save();
});


router.get('/business',function(req,res){
    business.find().then(function(user_data){
        res.send(user_data);

    
}).catch(function(e){
    
            res.send(e)
        
    });
})




router.delete('/business/:id',function(req,res){
    business.findByIdAndDelete(req.params.id).then(function(){

    }).catch(function(){
        res.send(e)
    })

    
});

router.put('/business/:id',function(req,res){
    business.findOneAndUpdate({_id :req.params.id},req.body).then(function(){
        res.send("updated")
    }).catch(function(e){
        res.send(e)
    })
})
router.post('/viewbusiness',function(req,res){
  console.log(req.body)
  business.findById(req.body.businessid).then(function(user_data){
      res.send(user_data);

  
}).catch(function(e){
  
          res.send(e)
      
  });
})

router.get('/business/single/:id', function(req,res){
  business.findOne({_id :req.params.id}).then(function(user_data){
      res.send(user_data)
  }).catch(function(e){
      res.send(e)
  });
})

module.exports = router