const mongoose = require('mongoose')
const { Schema } = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
})
const User = mongoose.model('User', user)
module.exports = User;