const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const transporter = require('../Helper/NodeMailer');
const CheckEmail = require('../Helper/CheckEmail');

async function checkEmails(emailIds) {
    const results = await Promise.all(emailIds.map(async email => {
        try {
            const exists = await CheckEmail(email);
            return { email, exists };
        } catch (error) {
            // console.error(`Error verifying email ${email}:`, error);
            return { email, exists: false };
        }
    }));
    return results;
}

exports.sendMail = asyncHandler(async (req, res) => {
    try {
        const { emails } = req.body;
        const { classId } = req.body;
        const userId = req.user.id;

        const classRoom = await Classroom.findOne({ classId: classId })
        if (!classRoom) {
            return res.status(404).send({ error: true, message: 'Room not found' })
        }
        if (classRoom.adminId != userId) {
            return res.status(401).send({ error: true, message: 'unauthorized access request' })
        }
        // console.log(emails);
        checkEmails(emails)
            .then(async (results) => {
                const invalidEmails = results.filter(result => !result.exists).map(result => result.email);
                const validEmails = results.filter(result => result.exists).map(result => result.email);
                // console.log(validEmails);
                // console.log(invalidEmails);
                if (validEmails.length > 0) {
                    let info = await transporter.sendMail({
                        from: '"Anushka shukla" <anushkashukla3003@gmail.com>',
                        to: validEmails.join(','),
                        subject: "Invitation",
                        text: `Hello dear members , We invite you to join our Room on Collebora-digital workspace . RoomId is ${classId} . Please do not share this Id with anyone`,
                    });

                    // console.log(info);
                    if (invalidEmails.length > 0)
                        return res.status(200).send({ success: true, message: `Invitation sent to valid email addressess` });
                    else {
                        return res.status(200).send({ success: true, message: `Invitation sent to entered email addressess` });
                    }


                } else {
                    res.status(200).json({ error:true,message: `Entered email addressess are invalid` });
                }
            })
            .catch(error => {
                // console.error('Error during email verification:', error);
                res.status(500).json({ error: 'Failed to verify email addresses' });
            });


    }
    catch (error) {
        // console.log(error)
        return res.status(400).send({ error: true, message: 'Internal server error' })
    }
})