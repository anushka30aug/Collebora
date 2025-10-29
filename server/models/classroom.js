const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const classroom = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  code: { type: String, required: true, minLength: 6 },
  classId: { type: String, required: true, minLength: 4, unique: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
  adminName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
  theme: {
    type: String,
    required: true,
    enum: [
      "https://gstatic.com/classroom/themes/img_graduation.jpg",
      "https://gstatic.com/classroom/themes/img_code.jpg",
      "https://gstatic.com/classroom/themes/img_reachout.jpg",
      "https://gstatic.com/classroom/themes/img_breakfast.jpg",
      "https://gstatic.com/classroom/themes/img_coffee.jpg",
      "https://gstatic.com/classroom/themes/img_read.jpg",
    ],
  },
});

module.exports = mongoose.model("Classroom", classroom);
