const venue = require("../models/Venue");
const fs = require('fs');


    exports.addVenues =(req, res) => {
         

        var capacity = {
            indoor : req.body.indoor,
            outdoor : req.body.outdoor
        } 

        var pricing = {
            veg : req.body.veg,
            nonVeg : req.body.nonVeg
        }

       
        

        req.files.map(function(item){
            var imagename = item.filename;
            venue.create({
                vendorid :   req.vendor._id,
                venueName :   req.body.name,
                venueType :   req.body.type,
                venueDesc :  req.body.desc,
                venueContact :  req.body.contact,
                
                venuelocation :  req.body.location,
                venueCapacity :  capacity,
                venuePricing :  pricing,
                image :imagename,
                availableDates : []
           },
           function(err, venue){
               if(err) return res.status(500).send(err);
           
               res.status(200).json({
                   success : true,
                   message : 'Venue Successfully Added',
                   venue: venue
               });
           }
           
           );
   
        })

    }
    exports.getVenuesByVendor =(req, res) => {
        venue.find({vendorid : req.vendor._id}, function(err, venues){
            if(err) return res.status(500).send({
                success : false,
                message : err.message
            });

            return res.json({
                success : true,
                venues : venues
            });
        })
    }
    exports.getVenues =(req, res) => {
        venue.find(function(err,venue){
            if(err) return res.status(500).send({
                success : false,
                message : err.message
            });

            var venuearray = []

            venue.forEach(element => {
                var venueObj = {
                    id : element._id,
                    name : element.venueName,
                    image : element.image,
                    contact : element.venueContact,
                }

                venuearray.push(venueObj)
            });

            return res.send({
                success  : true,
                venue : venuearray
            })
        })

    }

    

        exports.getVenuesById =(req, res) => {
            venue.findOne({_id : req.body.venueid}, function(err,venuedata){
        
        if(err) return res.status(500).send({
                success : false,
                message : err.message
            });


           
            return res.json({
                success : true,
                
                venue : [venuedata]
            });
        })
    }
    
