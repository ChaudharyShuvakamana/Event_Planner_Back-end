const mongoose = require('mongoose')
const bookingbusiness = mongoose.model('bookingbusiness', {    

    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        trim:true
    },
    fullname: {
        type: String,
        require:true,
        trim: true
    },
    address: {
        type: String,
        require:true,
        trim: true
    },
    number: {
        type: String,
        require:true,
        trim: true
    },
    email: {
        type: String,
        require:true,
        trim: true
    },
    eventname: {
        type: String,
        require:true,
        trim: true
    },
    from: {
        type: String,
        require:true,
        trim: true
    },
    to: {
        type: String,
        require:true,
        trim: true
    },
    business_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'business',
        trim:true
    }
    
  })

  module.exports = bookingbusiness