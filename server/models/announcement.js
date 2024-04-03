const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const announcement = new Schema({
classId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
announcement:{
    type:String,
    required:true,   
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

const Announcement = mongoose.model('Announcement',announcement);
module.exports=Announcement;