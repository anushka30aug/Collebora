const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');
const Announcement = require('../models/announcement');
const Chat = require('../models/chatroom');
const Message = require('../models/Message');


exports.createClassroom = asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).send({ error: true, message: error.errors[0].msg })
    }
    try {
        const { name, classcode, classId } = req.body;
        const admin = req.user.id;
        const user = await User.findOne({ _id: admin });
        if (!user) {
            res.status(404).send({ error: true, message: 'User not found' });
        }
        const classroom = await Classroom.findOne({ classId: classId });
        if (classroom !== null) {
            res.status(400).send({ error: true, message: 'Entered RoomId not available (already in use)' })
        }
        else {
            const classroom = await Classroom.create({
                name: name,
                code: classcode,
                classId: classId,
                adminId: admin,
                adminName: user.name
            });
            await classroom.save(); 

            const Chatroom = await Chat.create({
                _id: classroom._id,
                members:[user._id],
                groupAdmin: user._id
             })
            await Chatroom.save();
            console.log(classroom); 
            res.status(200).send({ success: true, data:classroom });
        }

    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})

exports.fetchClassroom = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const isActive = req.query.isActive;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else {
            const classRooms = await Classroom.find({ members: userId, isActive: isActive }).select("-code");
            res.status(200).send({ success: true, data: classRooms });
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})

exports.fetchClassroomAsAdmin = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const isActive = req.query.isActive;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else {
            const classRooms = await Classroom.find({ adminId: userId, isActive: isActive }).select("-code");
            res.status(200).send({ success: true, data: classRooms });
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
}
)

exports.updatedClassroom = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const { newName, classcode } = req.body;

        const classroom = await Classroom.findOne({ _id: id });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'classroom not found' });
        }
        else {
            if (classroom.adminId.toString() !== userId.toString()) {
                res.status(401).send({ error: true, message: 'unauthorized access request' })
            }
            else if (classcode !== classroom.code) {
                res.status(401).send({ error: true, message: 'Invalid Roomcode' })
            }
            else {
                classroom.name = newName;
                classroom.save();
                res.status(200).send({ success: true, message: 'Name updated successfully' })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: true, message: 'unexpected error occured' });
    }
})

exports.deleteClassroom = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.body.id;
        const classCode = req.body.classCode;

        const classroom = await Classroom.findOne({ _id: id });
        if (!classroom) {
            res.status(404).send({ error: true, message: "classroom not found" })
        }

        else {
            if (classroom.code !== classCode) {
                res.status(400).send({ error: true, message: "invalid class code" })
            }
            else if (classroom.adminId.toString() !== userId.toString()) {
                res.status(401).send({ error: true, message: 'unauthorized access' })
            }
            else {
                await Chat.deleteOne({_id:classroom._id})
                await Message.deleteMany({chatId:classroom._id});
                await Announcement.deleteMany({ classId: id });
                await Classroom.deleteOne({ _id: id });
                res.status(200).send({ success: true, message: 'classroom deleted successfully' })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})


exports.toogle_Archive = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const {id}= req.body; 

        const classroom = await Classroom.findOne({ _id: id });
        const user = await User.findOne({ _id: userId })
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else if (!classroom) {
            res.status(404).send({ error: true, message: "classroom not found" })
        }
        else {
            if (classroom.adminId.toString() !== userId.toString()) {
                res.status(401).send({ error: true, message: 'Invalid access request' })
            }
            else {
                classroom.isActive = !classroom.isActive
                classroom.save();
                res.status(200).send({ success: true, message: classroom.isActive ? 'Classroom Activated' : 'Classroom Deactivated' })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }

})

