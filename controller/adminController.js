const admin = require('../models/Admin');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');

exports.login =(req, res) => {
    admin.findOne({email : req.body.email}, function(err, admin){
      if(err){
          return res.status(500).send('Error on the server');
          
      }
      
      
      if(!admin){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
      if(!passwordIsValid){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }

    
      let token = jwt.sign({id : admin._id.toString()},config.secret, 
          {
              expiresIn : '24h'
          }) ;
          admin.tokens = admin.tokens.concat({ token: token });
           admin.save();
  
           res.status(200).json({
            success : true,
            message : 'Authentication successful',
            token : token,
            name : admin.firstname + " " + admin.lastname,
            email : admin.email,
            image : admin.profileImg,
         
        });
    });
  }


//function for registration
exports.addadmin =(req, res) => {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        admin.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            location : req.body.location,
            email : req.body.email,
            phonenumber: req.body.phonenumber,
            password : hashedPassword
        },
        
        function(err, admin){
            if(err) return res.status(500).send(err)
        
            let token = jwt.sign({id : admin._id},config.secret, 
                {
                    expiresIn : '24h'
                }) ;
                admin.tokens = admin.tokens.concat({ token: token });
                admin.save();    

               return res.status(200).json({
                    success : true,
                    message : 'Authentication successful',
                    token : token,
                    name : admin.firstname + " " + admin.lastname,
                    email : admin.email,
                    image : admin.profileImg,
                    adminid : admin._id
                });
        }
        
        );
        
        }
        exports.checkEmailAvailabilityser =(req, res) => {
            admin.findOne({email : req.body.email}, function(err, admin){
                if(err){
                    return res.status(500).send('Error on the server');
                    
                }
        
                if(admin){
                   
                    return res.send({
                        success : false,
                        message: 'Email Already Exists',
                        
                    });
                }else{
                    return res.send({
                        success : true,
                        message: 'Email Available',
                        
                    });
                }
                
            })
        }