const user = require('../models/User');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');

exports.login =(req, res) => {
    user.findOne({email : req.body.email}, function(err, user){
      if(err){
          return res.status(500).send('Error on the server');
          
      }
      
      
      if(!user){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if(!passwordIsValid){
          return res.status(401).json({
              success : false,
              message: 'Incorrent username or password',
              token : null
          });
      }

    
      let token = jwt.sign({id : user._id.toString()},config.secret, 
          {
              expiresIn : '24h'
          }) ;
          user.tokens = user.tokens.concat({ token: token });
           user.save();
  
         return res.status(200).json({
              success : true,
              message : 'Authentication successful',
              token : token,
              name : user.firstname + " " + user.lastname,
              email : user.email,
              image : user.profileImg,
              userid : user._id
          });
    });
  }

//function for adding user
exports.adduser =(req, res) => {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        user.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            location : req.body.location,
            email : req.body.email,
            phonenumber: req.body.phonenumber,
            password : hashedPassword
        },
        
        function(err, user){
            if(err) return res.status(500).send(err)
        
            let token = jwt.sign({id : user._id},config.secret, 
                {
                    expiresIn : '24h'
                }) ;
                user.tokens = user.tokens.concat({ token: token });
                user.save();    

               return res.status(200).json({
                    success : true,
                    message : 'Authentication successful',
                    token : token,
                    name : user.firstname + " " + user.lastname,
                    email : user.email,
                    image : user.profileImg,
                    userid : user._id
                });
        }
        
        );
        
        }
        
        exports.checkEmailAvailabilityser =(req, res) => {
            user.findOne({email : req.body.email}, function(err, user){
                if(err){
                    return res.status(500).send('Error on the server');
                    
                }
        
                if(user){
                   
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
