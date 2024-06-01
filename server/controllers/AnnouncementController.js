const asyncHandler = require('express-async-handler');
const Announcement = require('../models/announcement');
const Classroom = require('../models/classroom');
const User = require('../models/user');

exports.makeAnnouncement = asyncHandler(async (req, res) => {
    try {
        const { message, Id } = req.body;
        const userId = req.user.id;
        const files = req.files;

        const classroom = await Classroom.findOne({ _id: Id });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Room not found' })
            return;
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'User not found' })
            return;
        }

        if (classroom.adminId.toString() !== userId.toString()) {
            res.status(401).send({ error: true, message: 'Unauthorized access request' })
            return;
        }

        // Map files to create file documents for MongoDB
        let fileDocuments = null
        if(files)
        {
            fileDocuments = files.map((file) => ({
            name: file.originalname,
            data: file.buffer,
            contentType: file.mimetype 
        }));
    }
       

        const announcement = new Announcement({
            classId: Id,
            announcement: message,
            files: fileDocuments
        });

        await announcement.save();

        res.status(200).json({ success: true, message: 'Announcement submitted successfully' });
    } catch (error) {
        console.error('Error saving announcement:', error);
        res.status(500).json({ error: true, message: 'An error occurred while saving the announcement' });
    }
});
 

exports.fetchAnnouncement = asyncHandler(async (req, res) => {
    try {
        const Id = req.query.id;
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;


        const classroom = await Classroom.findOne({ _id: Id })
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Room not found' })
        }
        else {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                res.status(404).send({ error: true, message: 'user not found' })
            }
            else {
                if (!classroom.members.includes(userId) && classroom.adminId.toString() !== userId.toString()) {
                    res.status(401).send({ error: true, message: 'Unauthorized access request' })
                }
                else {
                    const Announcements = await Announcement.find({ classId: Id }).sort({ date: -1 })
                        .skip(skip)
                        .limit(limit);
                    const totalCount = await Announcement.countDocuments({ classId: Id });
                    const announcementsWithFiles = await Promise.all(Announcements.map(async (announcement) => {
                        const files = await Promise.all(announcement.files.map(async (file) => {
                            const base64Data = file.data.toString('base64');
                            return {
                                ...file.toObject(), // Convert Mongoose document to plain JavaScript object
                                data: base64Data,
                            };
                        }));
                        return {
                            ...announcement.toObject(), // Convert Mongoose document to plain JavaScript object
                            files,
                        };
                    }));
            
                    res.status(200).send({ success: true, data:{announcements: announcementsWithFiles, totalCount}  });
                    // res.status(200).send({ success: true, data: Announcements ,totalCount });
                }
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: error.message })
    }
})