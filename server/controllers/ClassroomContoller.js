const asyncHandler = require("express-async-handler");
const Classroom = require("../models/classroom");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
const Announcement = require("../models/announcement");
const Chat = require("../models/chatroom");
const Message = require("../models/Message");

exports.createClassroom = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send({ error: true, message: error.errors[0].msg });
  }

  try {
    const { name, classcode, classId } = req.body;
    const admin = req.user.id;
    const user = await User.findOne({ _id: admin });
    if (!user)
      return res.status(404).send({ error: true, message: "User not found" });

    const existingClass = await Classroom.findOne({ classId });
    if (existingClass)
      return res
        .status(400)
        .send({
          error: true,
          message: "Entered RoomId not available (already in use)",
        });

    // 🎨 List of available themes
    const themes = [
      "https://gstatic.com/classroom/themes/img_graduation.jpg",
      "https://gstatic.com/classroom/themes/img_code.jpg",
      "https://gstatic.com/classroom/themes/img_reachout.jpg",
      "https://gstatic.com/classroom/themes/img_breakfast.jpg",
      "https://gstatic.com/classroom/themes/img_coffee.jpg",
      "https://gstatic.com/classroom/themes/img_read.jpg",
    ];

    // Pick one random theme
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const classroom = await Classroom.create({
      name,
      code: classcode,
      classId,
      adminId: admin,
      adminName: user.name,
      theme: randomTheme, // 🎨 Save it in DB
    });

    await Chat.create({
      _id: classroom._id,
      members: [user._id],
      groupAdmin: user._id,
    });

    res.status(200).send({ success: true, data: classroom });
  } catch (error) {
    res.status(400).send({ error: true, message: "unexpected error occured" });
  }
});

exports.fetchClassroom = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const isActive = req.query.isActive;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).send({ error: true, message: "user not found" });
    } else {
      const classRooms = await Classroom.find({
        members: userId,
        isActive: isActive,
      }).select("-code");
      res.status(200).send({ success: true, data: classRooms });
    }
  } catch (error) {
    res.status(400).send({ error: true, message: "unexpected error occured" });
  }
});

exports.fetchClassroomAsAdmin = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const isActive = req.query.isActive;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).send({ error: true, message: "user not found" });
    } else {
      const classRooms = await Classroom.find({
        adminId: userId,
        isActive: isActive,
      }).select("-code");
      res.status(200).send({ success: true, data: classRooms });
    }
  } catch (error) {
    res.status(400).send({ error: true, message: "unexpected error occured" });
  }
});

exports.updatedClassroom = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const classId = req.params.classId;
    const { newName, classcode } = req.body;
    // console.log(classId);
    const classroom = await Classroom.findOne({ classId: classId });
    if (!classroom) {
      res.status(404).send({ error: true, message: "classroom not found" });
    } else {
      if (classroom.adminId.toString() !== userId.toString()) {
        res
          .status(401)
          .send({ error: true, message: "unauthorized access request" });
      } else if (classcode !== classroom.code) {
        res.status(401).send({ error: true, message: "Invalid Roomcode" });
      } else {
        classroom.name = newName;
        classroom.save();
        res
          .status(200)
          .send({ success: true, message: "Name updated successfully" });
      }
    }
  } catch (error) {
    // console.log(error)
    res.status(400).send({ error: true, message: "unexpected error occured" });
  }
});

exports.deleteClassroom = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const classId = req.body.classId;
    const classCode = req.body.classCode;

    const classroom = await Classroom.findOne({ classId: classId });
    if (!classroom) {
      return res
        .status(404)
        .send({ error: true, message: "Classroom not found" });
    }

    if (classroom.code !== classCode) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid class code" });
    }

    if (classroom.adminId.toString() !== userId.toString()) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access" });
    }

    await Chat.deleteOne({ _id: classroom._id });
    await Message.deleteMany({ chatId: classroom._id });
    await Announcement.deleteMany({ classId: classroom._id });
    await Classroom.deleteOne({ classId: classId });

    res
      .status(200)
      .send({ success: true, message: "Classroom deleted successfully" });
  } catch (error) {
    // console.error(error);
    res.status(400).send({ error: true, message: "Unexpected error occurred" });
  }
});

exports.toogle_Archive = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const classroom = await Classroom.findOne({ _id: id });
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).send({ error: true, message: "user not found" });
    } else if (!classroom) {
      res.status(404).send({ error: true, message: "classroom not found" });
    } else {
      if (classroom.adminId.toString() !== userId.toString()) {
        res
          .status(401)
          .send({ error: true, message: "Invalid access request" });
      } else {
        classroom.isActive = !classroom.isActive;
        classroom.save();
        res
          .status(200)
          .send({
            success: true,
            message: classroom.isActive
              ? "Classroom Activated"
              : "Classroom Deactivated",
          });
      }
    }
  } catch (error) {
    // console.log(error)
    res.status(400).send({ error: true, message: "unexpected error occured" });
  }
});
