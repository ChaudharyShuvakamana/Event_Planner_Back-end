const venue = require("../models/Venue");
const fs = require('fs');

var checkIfDirectoryExists = (dirname, successcallback, errorcallback) => {
    try{
        var stats = fs.lstatSync(dirPath);
       
        if (stats.isDirectory()) {
            successCallback();
        }
    }catch(e){
        errorcallback();
    }
}

 var mkdirectory = (dirPath) => {

    return new Promise(function(resolve, reject) {
        checkIfDirectoryExists(dirPath, function() {
            resolve();
        }, function() {
            fs.mkdirSync(dirPath);
            resolve();
        });
    });

}

class VenueController{

    addVenues(req, res){
         

        var capacity = {
            indoor : req.body.indoor,
            outdoor : req.body.outdoor
        } 

        var pricing = {
            veg : req.body.veg,
            nonVeg : req.body.nonVeg
        }

        var location = {
            name : req.body.address,
            lat : req.body.lat,
            lng : req.body.lng
        }

        

        req.files.map(function(item){
            var imagename = item.filename;
            venue.create({
                vendorid :   req.vendor._id,
                venueName :   req.body.name,
                venueType :   req.body.type,
                venueDesc :  req.body.desc,
                venueContact :  req.body.contact,
                venueCapacity :  capacity,
                venuePricing :  pricing,
                location:  location,
                image :imagename,
                availableDates : [],
                album : []
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
}

module.exports = VenueController;