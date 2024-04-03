const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');


exports.addMember = asyncHandler(async (req, res) => {
    try {
        const { classId } = req.body;
        const userId = req.user.id;
        const classroom = await Classroom.findOne({ classId: classId });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Classroom not found' })
        }
        else {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                res.status(404).send({ error: true, message: 'user not found' });
            }
            else {
                if (classroom.members.includes(userId)) {
                    return res.status(400).send({ success: true, message: 'User already exists in the classroom' });
                }
            
                // If user doesn't exist in the classroom, add the user
                classroom.members.push(userId);
                await classroom.save();
            
                res.status(200).send({ success: true, message: 'User added successfully' });
            }
        }
    }
    catch (error) {
        console.log(error)
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
                if (!classroom.members.includes(userId) && classroom.adminId.toString()!==userId.toString()) {
                    return res.status(401).send({ error: true, message: 'Unauthorized request' });
                }
            }
            let members =await Promise.all( classroom.members.map(async (element) => {
                const user = await User.findOne({ _id: element });
                return user;
            }));
            res.status(200).send({ success: true, data: members })
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})




