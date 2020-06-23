const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vendorSchema = new Schema({
    fullname : {
        type : String,
        required: [true, "Name field is required"]
    },
    location: {
        type: String,
       
    },
    phonenumber: {
        type : String,
        required: [true, "Name field is required"]
    },
    email : {
        type : String,
        required: [true, "Name field is required"]
    },

    businesstype : {
        type : String,
        required: [true, "Name field is required"]
    },
    
    password: {
        type : String,
        required : [true, "Name field is required"]
    },


    profileImg : {
        type : String,
        default : "avataaar.png",
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

const vendor = mongoose.model('vendor', vendorSchema);

module.exports = vendor;
