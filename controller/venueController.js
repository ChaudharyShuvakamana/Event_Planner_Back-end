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

    getVenuesByVendor(req, res){
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

    getVenues(req, res){

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
                    location : element.location,
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

    


    getVenuesById(req, res){
      

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
    
    addAvailableDates(req, res){

        var dates = req.body.dates;

        venue.findById(req.body.venueid, function(err, venuedata){
            for(var i =0; i < dates.length; i++){
                if(venuedata.availableDates.indexOf(dates[i]) > -1){
                    dates.splice(i, 1);
                }
            }

            venue.findByIdAndUpdate(req.body.venueid, { $push: { availableDates : { "$each": dates }}}, function(err, venue){

                if(err) return res.send({
                    success : false,
                    message : err.message
                });
    
                return res.send({
                    success : true,
                    message : "dates added"
                })
    
            })
        })
 
      

    }

    addToAlbum(req, res){

        console.log(req.files);
        req.files.map(function(item, index){
            
            var imagename = item.filename;

            var imagearray = [];

            imagearray.push(imagename)

            venue.findByIdAndUpdate(req.body.venueid,{ $push: { album : { "$each": imagearray }}}, function(err, venue){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })

              
                var path = "public/images/venues/";
                var dirname =  path + "/" + req.body.venueid;
                var tmpfilename = "tmp" + imagename;
                var fileExists =  fs.existsSync(dirname);
                
                if (fileExists) {
             
                        fs.rename('public/images/tmp/' + imagename, dirname + "/" + imagename, function(err){
                            if(err) return res.status(400).send(err.message)
                            if(index == (imagearray.length - 1)){
                                return res.status(200).send("uploaded");
                            }
                            
                        })
                   
                 }
                 else{
                  mkdirectory(dirname).then(function(){
                  
                         fs.rename('public/images/tmp/' + imagename, dirname + "/" + imagename, function(err){
                             if(err) return res.status(400).send(err.message)
                             if(index == (imagearray.length - 1)){
                                return res.status(200).send("uploaded");
                            }
                         })
                                
                 })
                 }
            })
        })
     
    }

    getDates(req, res){

        venue.findById(req.body.venueid, function(err, data){

            var venueDates = data.availableDates;

            booking.find({venueid : data._id}, function(err, bookingdata){
                if(err) return res.send({
                    success: false,
                    message : err.message
                })


               if(bookingdata.length == 0){
                return res.send({
                    success : true,
                    message : "All Dates Available",
                    dates : venueDates
                });
               } 

              
              getDatesPromise(bookingdata, venueDates).then(function(data){
                return res.send({
                    success : true,
                    dates : data[0]
                });
              })
              
                      
                
               

               
              

                    
                
            })

          
        })

    }

    deleteAlbum(req, res){
        venue.findByIdAndUpdate(req.body.venueid, {$pull : {album : req.body.image}}, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            venue.findById(req.body.venueid, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                
                return res.send({
                    success : true,
                    album : data.album
                })
            })
        })
    }

    updateVenue(req, res){

        var update = {
            venueName :   req.body.venueName,
            venueType :   req.body.venueType,
            venueDesc :  req.body.venueDesc,
            venueContact :  req.body.venueContact,
            venueCapacity :  req.body.venueCapacity,
            venuePricing :  req.body.venuePricing,

        }
        venue.findByIdAndUpdate(req.body.venueid, update, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })
            venue.findById(req.body.venueid, function(err, venuedata){

                if(err) return res.send({
                    success : false,
                    message : err.message
                })

                return res.send({
                    success:true,
                    message : "Venue Updated"
                })
            })
        })
    }


    
   
}


module.exports = VenueController;