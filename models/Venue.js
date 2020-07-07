const mongoose = require('mongoose')
const venue= mongoose.model('venue',{
 
        venuename: {
            type: String
        },
        venuetype :{
            type: String

        },
        phone:{
            type:String
        },
    
        address: {
            type: String
        },
        email: {
            type: String
        },
        description:{
            type : String
        },
        Image: { type: String, 
            required: true }
    })
    module.exports = venue