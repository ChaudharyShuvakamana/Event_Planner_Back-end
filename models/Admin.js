const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    firstname : {
        type : String,
        required: [true, "Name field is required"]
    },
    lastname : {
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

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
