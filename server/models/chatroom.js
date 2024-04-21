const mongoose = require("mongoose");
const {Schema}= mongoose;

const chatroom = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
); 
 
const Chat = mongoose.model("Chat", chatroom);
module.exports = Chat;    