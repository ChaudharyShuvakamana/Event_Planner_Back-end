const mongoose = require('mongoose')
const business = mongoose.model('business', {    

    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        trim:true
    },
    businesstype: {
        type: String,
        require:true,
        trim: true
    },
    image: {
        type: String,
        require:true,
        trim: true
    },
    businessname:{
        type: String,
        require:true
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
    price: {
        type: String
    },
    description:{
        type : String
    },
    
  })

  module.exports = business