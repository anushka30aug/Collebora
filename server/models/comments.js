const mongoose = require('mongoose');
const {Schema } = require('mongoose');
const Announcement = require('./announcement');
const User = require('./user')

const comment = new Schema({
    announcementId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Announcement,
    },
    text:{
        type: String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    files:[
        {
          name: String,
          data: Buffer,
          contentType: String
        }
      ],
    date:{
        type:Date,
        default:Date.now
    }
})

const Comment = mongoose.model('Comment',comment);
module.exports = Comment;

