const admin = require('../models/Admin');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');

//function for adding trip
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