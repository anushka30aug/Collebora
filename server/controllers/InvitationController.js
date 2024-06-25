const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const transporter = require('../Helper/NodeMailer');

exports.sendMail = asyncHandler(async (req, res) => {
    try {
        const { emails } = req.body;
        const { classId } = req.body;
        const userId = req.user.id;

        const classRoom = await Classroom.findOne({ classId: classId });
        if (!classRoom) {
            return res.status(404).send({ error: true, message: 'Room not found' })
        }
        if (classRoom.adminId != userId) {
            return res.status(401).send({ error: true, message: 'unauthorized access request' })
        }

        let info = await transporter.sendMail({
            from: '"Anushka shukla" <anushkashukla3003@gmail.com>',
            to: emails.join(','),
            subject: "Invitation",
            text: `Hello dear members , We invite you to join our Room on Collebora-digital workspace . RoomId is ${classId} . Please do not share this Id with anyone`,
        });

        console.log(info);

        return res.status(200).send({ success: true, message: 'invitation sent successfully' });
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({ error: true, message: 'unexpected error occured' })
    }
})