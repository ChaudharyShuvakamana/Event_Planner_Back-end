const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    // User vhaneko model banako. 
    fullname: {
        type: String
    },
    address:{
        type: String
    },
    number: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    images: {
        type: String,
        default:"naruto.jpg"
    },
    user_type:{
        type: String,
        default:"user"
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
})



userSchema.statics.checkCrediantialsDb = async (email, password) => {

    const user1 = await User.findOne({ email: email, password: password })
    return user1;
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}




const User = mongoose.model('users', userSchema)

module.exports = User