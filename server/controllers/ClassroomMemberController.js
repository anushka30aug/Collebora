const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
const Chat = require('../models/chatroom');


exports.addMember = asyncHandler(async (req, res) => {
    try {
        const { classId } = req.body;
        const userId = req.user.id;
        const classroom = await Classroom.findOne({ classId: classId }).select('-code');
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Room not found' })
        }
        else {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                res.status(404).send({ error: true, message: 'user not found' });
            }
            else {
                if (classroom.members.includes(userId)) {
                    return res.status(400).send({ success: true, message: `User already exists in the Room` });
                }

                else if (classroom.adminId.toString() === userId.toString()) {
                    return res.status(400).send({ success: true, message: `User already present in Room as Admin` });
                }

                // If user doesn't exist in the classroom, add the user
                classroom.members.push(userId);
                await classroom.save();

                const chatroom = await Chat.findOne({ _id: classroom._id });
                if (chatroom) {
                    chatroom.members.push(userId);
                }
                await chatroom.save();

                res.status(200).send({ success: true, data: classroom });
            }
        }
    }
    catch (error) {
        // console.log(error)
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }

})

exports.fetchMembers = asyncHandler(async (req, res) => {
    try {
        const classroomId = req.params.id;
        const userId = req.user.id;
        const classroom = await Classroom.findOne({ _id: classroomId }).select("-code");
        if (!classroom) {
            res.status(404).send({ error: true, message: 'no class found' })
        }
        else {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                res.status(404).send({ error: true, message: 'user not found' });
            }
            else {
                if (!classroom.members.includes(userId) && classroom.adminId.toString() !== userId.toString()) {
                    return res.status(401).send({ error: true, message: 'Unauthorized request' });
                }
                else {
                    let members = await Promise.all(classroom.members.map(async (element) => {
                        const user = await User.findOne({ _id: element });
                        return user;
                    }));
                    const Admin = await User.findOne({ _id: classroom.adminId })
                    res.status(200).send({ success: true, data: { members: members, admin: Admin } });
                }

            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})


exports.removeMember = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { userToRemove, classcode, Id } = req.body;
        const classroom = await Classroom.findOne({ _id: Id });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'classroom not found' })
        }
        else {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                res.status(404).send({ error: true, message: 'you are not recognized as valid user' });
            }
            else if (classroom.adminId.toString() !== userId.toString()) {
                res.status(401).send({ error: true, message: ' invalid access request' })
            }
            else if (classroom.code !== classcode) {
                res.status(401).send({ error: true, message: ' invalid class code' })
            }
            else {
                if (!classroom.members.includes(userToRemove)) {
                    res.status(404).send({ error: true, message: 'user not found as member' });
                }
                const updatedClassroom = await Classroom.findByIdAndUpdate(
                    Id,
                    { $pull: { members: userToRemove } },
                    { new: true }
                );
                // console.log(updatedClassroom)
                res.status(200).send({ success: true, message: 'User removed successfully' });
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})


exports.leaveRoom = asyncHandler(async (req, res) => {
    try {
        const { Id } = req.body;
        const userId = req.user.id;
        const classroom = await Classroom.findOne({ _id: Id });
        const user = await User.findOne({ _id: userId })
        if (!classroom) {
            res.status(404).send({ error: true, message: 'room not found' })
        }
        else if (!user) {
            res.status(404).send({ error: true, message: 'User not found' })
        }
        else {
            if (!classroom.members.includes(userId)) {
                res.status(404).send({ error: true, message: 'user not found as member' });
            }
            const updatedClassroom = await Classroom.findByIdAndUpdate(
                Id,
                { $pull: { members: userId } },
                { new: true }
            );
            // console.log(updatedClassroom)
            res.status(200).send({ success: true, message: 'You left the Room successfully' });
        }
    }
    catch (error) {
        // console.log(error)
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }


})



