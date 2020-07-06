const business = require('../models/Business');
const fs = require('fs');

exports.addBusiness =(req, res) => {
        console.log()
        req.files.map(function(item){
            var imagename = item.filename;
      
           
        business.create({
            vendorid : req.vendor._id,
            businessname: req.body.name,
            businesstype : req.body.type,
            businessdesc : req.body.desc,
            businesspricing : req.body.price,
            businesslocation : req.body.location,
            businessImage: imagename,
            businesscontact : req.body.contact,
            availableDates : []

        }, function(err , data){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            return res.send({
                success : true,
                data : data
            })
        })

    })

    
    }

        exports.getBusinessByVendor =(req, res) => {
        business.find({vendorid : req.vendor._id}, function(err, business){
            if(err) return res.status(500).send({
                success : false,
                message : err.message
            });

            return res.json({
                success : true,
                business : business
            });
        })
    }
    exports.getBusiness =(req, res) => {
        business.find(function(err,venue){
            if(err) return res.status(500).send({
                success : false,
                message : err.message
            });

            var businessarray = []

            business.forEach(element => {
                var businessObj = {
                    id : element._id,
                    name : element.businessname,
                    image : element.image,
                    contact : element.businesscontact,
                }

                businessarray.push(businessObj)
            });

            return res.send({
                success  : true,
                business : businessarray
            })
        })

    }

    //     exports.getBusinessByCategory =(req, res) => {
    //     business.find({businesstype : req.body.category}, function(err, business){
    //         if(err) return res.send({
    //             success : false,
    //             message : err.message
    //         })

    //         var businessarray = []

    //         business.forEach(element => {
    //             var businessObj = {
    //                 id : element._id,
    //                 name : element.businessname,
    //                 location : element.businesslocation,
    //                 image : element.businessImage,
    //                 contact : element.businesscontact,
    //             }

    //             businessarray.push(businessObj)
    //         });

    //         return res.send({
    //             success  : true,
    //             business : businessarray
    //         })
    //     })
    // }

        exports.getBusinessById =(req, res) => {
        business.findById(req.body.businessid, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })


            return res.send({
                success : true,
                business : data
            })
        })
    }
           

