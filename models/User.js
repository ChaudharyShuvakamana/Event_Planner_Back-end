const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

    fullname: {
        type: String
    },
    address: {
        type: String
    },
    email:{
        type:String

    },
    number: {
        type: String
    },

    password: {
        type: String
    },
    user_type:
    {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

userSchema.statics.checkCrediantialsDb = async (email, password) => {
    const user1 = await user.findOne({ email: email, password: password })
    return user1;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    var token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token: token })
 
    await user.save() 
    return token
}
const user = mongoose.model('user', userSchema)
module.exports = user;