const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const User = require('./user')

const classroom = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    code: {
        type: String,
        required: true,
        minLength: 6
    },
    classId: {
        type: String,
        required: true,
        minLength: 4,
        unique: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Classroom = mongoose.model('Classroom', classroom);
module.exports = Classroom;