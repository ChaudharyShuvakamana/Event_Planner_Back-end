const mongoose = require('mongoose')
const post = mongoose.model('post', {    

    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        trim:true
    },
    status: {
        type: String,
        require:true,
        trim: true
    },
    image: {
        type: String,
        require:true,
        trim: true
    },
 
    
  })

  module.exports = post