const user = require('../models/User');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');

//function for adding trip
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