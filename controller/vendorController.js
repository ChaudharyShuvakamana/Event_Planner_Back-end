const vendor = require('../models/Vendor');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');



  
exports.login =(req, res) => {
    vendor.findOne({email : req.body.email}, function(err, vendor){
      if(err){
          return res.status(500).send('Error on the server');
          
      }
      
      
      if(!vendor){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, vendor.password);
      if(!passwordIsValid){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }

    
      let token = jwt.sign({id : vendor._id.toString()},config.secret, 
          {
              expiresIn : '24h'
          }) ;
          vendor.tokens = vendor.tokens.concat({ token: token });
           vendor.save();
  
           res.status(200).json({
            success : true,
            message : 'Authentication successful',
            token : token,
            name : vendor.fullname,
            email : vendor.email,
            type : vendor.businessType
        });
    });
  }

exports.addvendor =(req, res) => {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        vendor.create({
            fullname : req.body.fullname,
            location : req.body.location,
            email : req.body.email,
            businesstype : req.body.businesstype,
            phonenumber: req.body.phonenumber,
            password : hashedPassword
        },
        
        function(err, vendor){
            if(err) return res.status(500).send(err)
        
            let token = jwt.sign({id : vendor._id},config.secret, 
                {
                    expiresIn : '24h'
                }) ;
                vendor.tokens = vendor.tokens.concat({ token: token });
                vendor.save();    

               return res.status(200).json({
                    success : true,
                    message : 'Authentication successful',
                    token : token,
                    name : vendor.fullname,
                    email : vendor.email,
                    image : vendor.profileImg,
                    vendorid : vendor._id
                });
        }
        
        );
        
        }
        exports.checkEmailAvailabilityser =(req, res) => {
            vendor.findOne({email : req.body.email}, function(err, vendor){
                if(err){
                    return res.status(500).send('Error on the server');
                    
                }
        
                if(vendor){
                   
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