const business = require('../models/Business');
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
class BusinessController{

    addBusiness(req, res){
        console.log()
        var location = {
            name : req.body.address,
            lat : req.body.lat,
            lng : req.body.lng
        }
        req.files.map(function(item){
            var imagename = item.filename;
      
           
        business.create({
            vendorid : req.vendor._id,
            businessname: req.body.name,
            businesstype : req.body.type,
            businessdesc : req.body.desc,
            businesspricing : req.body.price,
            businesslocation :  location,
            businessImage: imagename,
            businesscontact : req.body.contact,
            availableDates : [],
            album : []

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

}

module.exports = BusinessController;