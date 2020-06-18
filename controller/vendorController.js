const vendor = require('../models/Vendor');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');

//function for adding trip
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