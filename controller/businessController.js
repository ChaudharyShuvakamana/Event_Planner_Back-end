const business = require('../models/Business');
const fs = require('fs');

var getBookingsPromise = (businessdata) => {

    var promise = businessdata.map((value) => {
    
         return new Promise(function(resolve, reject) {
             booking.find({businessid : value._id}).populate({ path: 'businessid weddingid',
             populate: {
               path: 'userid',
               model: 'user'} }).exec((err, data) => {
                 resolve(data)
             })
         });
         
     })

     return  Promise.all(promise)

}



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
class BusinessController{

    addBusiness(req, res){
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

    getBusinessByVendor(req, res){

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


    getBusinessByCategory(req, res){

        business.find({businesstype : req.body.category}, function(err, business){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            var businessarray = []

            business.forEach(element => {
                var businessObj = {
                    id : element._id,
                    name : element.businessname,
                    location : element.businesslocation,
                    image : element.businessImage,
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

    getBusinessByLocation(req, res){

        business.find(({'businesslocation.name': { $regex: req.body.location , $options : 'i' } }), function(err, business){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            var businessarray = []

            business.forEach(element => {
                var businessObj = {
                    id : element._id,
                    name : element.businessname,
                    location : element.businesslocation,
                    image : element.businessImage,
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


    getBusinessById(req, res){
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

    addAvailableDates(req, res){

        var dates = req.body.dates;
 
        business.findByIdAndUpdate(req.body.businessid, { $push: { availableDates : { "$each": dates }}}, function(err, business){

            if(err) return res.send({
                success : false,
                message : err.message
            });

            return res.send({
                success : true,
                message : "dates added"
            })

        })

    }

    getDates(req, res){

        business.findById(req.body.businessid, function(err, data){

            var businessDates = data.availableDates;

            booking.find({businessid : data._id}, function(err, bookingdata){
                if(err) return res.send({
                    success: false,
                    message : err.message
                })


               if(bookingdata.length == 0){
                return res.send({
                    success : true,
                    message : "All Dates Available",
                    dates : businessDates
                });
               } 

              
              getDatesPromise(bookingdata, businessDates).then(function(data){
                return res.send({
                    success : true,
                    dates : data[0]
                });
              })
              
            })

          
        })

    }


    updateBusiness(req, res){
     
                var update = {
                    businessname :   req.body.businessname,
                  
                    businessdesc :  req.body.businessdesc,
                    businesscontact :  req.body.businesscontact,
                   
                    businesspricing :  req.body.businesspricing,
        
                }
                business.findByIdAndUpdate(req.body.businessid, update, function(err, data){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })
                    business.findById(req.body.businessid, function(err, businessdata){
        
                        if(err) return res.send({
                            success : false,
                            message : err.message
                        })
        
                        return res.send({
                            success:true,
                            message : "Business Updated"
                        })
                    })
                })
            }
        

            getBookings(req, res){
        
                business.find({vendorid : req.vendor._id}, async function(err, businessdata){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })
                    getBookingsPromise(businessdata).then(function(data){
                        return res.send({
                            data: data[0]
                        })
                    })
                });
              
            }
           

}

module.exports = BusinessController;