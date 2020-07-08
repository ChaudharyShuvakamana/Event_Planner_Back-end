const mongoose = require('mongoose')
const venue = mongoose.model('venue', {    

    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        trim:true
    },
    venuetype: {
        type: String,
        require:true,
        trim: true
    },
    image: {
        type: String,
        require:true,
        trim: true
    },
    venuename:{
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
    description:{
        type : String
    },
    
  })

  module.exports = venue