const mongoose = require('mongoose')
const business= mongoose.model('business',{
 
        businessname: {
            type: String
        },
        businesstype :{
            type: String

        },
        phone:{
            type:String
        },
        address: {
            type: String
        },
        price:{
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
    module.exports = business