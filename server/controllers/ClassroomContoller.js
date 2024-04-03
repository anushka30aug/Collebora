const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');
const Announcement = require('../models/announcement');


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
            console.log(classroom);
            res.status(200).send({ success: true, message: 'Room created successfully' });
        }

    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})

exports.fetchClassroom = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else {
            const classRooms = await Classroom.find({ members: userId }).select("-code");
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
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else {
            const classRooms = await Classroom.find({ adminId: userId }).select("-code");
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


exports.removeMember = asyncHandler(async (req, res) => {
    try {
        const classroomId = req.params.id;
        const userId = req.user.id;
        const { userToRemove } = req.body;
        const classroom = await Classroom.findOne({ _id: classroomId });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'classroom not found' })
        }
        else {
            if (classroom.admin !== userId) {
                res.status(401).send({ error: true, message: ' invalid access request' })
            }
            else {
                const updatedClassroom = await Classroom.findByIdAndUpdate(
                    classroomId,
                    { $pull: { students: userToRemove } },
                    { new: true }
                );
                console.log(updatedClassroom)
                res.status(200).send({ success: true, message: 'User removed successfully' });
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
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
                await Classroom.deleteOne({ _id: id });
                await Announcement.deleteMany({classId:id})
                res.status(200).send({ success: true, message: 'classroom deleted successfully' })
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})


// generate invitation link for classroom
// send invitation link 

