const asyncHandler = require('express-async-handler');
const Classroom = require('../models/classroom');
const Announcement = require('../models/announcement');
const Comment = require('../models/comments');
const User = require('../models/user');

exports.addComment = asyncHandler(async (req, res) => {
    try {
        const { AnnouncementId, text, id } = req.body;
        const userId = req.user.id;
        const files = req.files;

        const classroom = await Classroom.findOne({ _id: id });
        const announcement = await Announcement.findOne({ _id: AnnouncementId });
        const user = await User.findOne({_id:userId});
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Room not found' });
        }
        else if (!classroom.members.includes(userId) && classroom.adminId != userId) {
            res.status(401).send({ error: true, message: 'unauthorized access request' });
        }
        else if (!announcement) {
            res.status(404).send({ error: true, message: `announcement with provided Id doesn't exist` });
        }
        else if (announcement.classId != id) {
            res.status(401).send({ error: true, message: `announcement doesn't exist in provided room id` })
        }
        else {
            let fileDocuments = null
            if (files) {
                fileDocuments = files.map((file) => ({
                    name: file.originalname,
                    data: file.buffer,
                    contentType: file.mimetype
                }));
            }

            const comment = await Comment.create({
                text,
                announcementId: AnnouncementId,
                postedBy: userId,
                files: fileDocuments
            });

            await comment.save();

            const fileData = await Promise.all(fileDocuments.map(async (file) => {
                    const base64Data = file.data.toString('base64');
                    return {
                        ...file, // Convert Mongoose document to plain JavaScript object
                        data: base64Data,
                    };
                }));


            const resp={
                text,
                announcementId: AnnouncementId,
                date:Date.now,
                postedBy: {
                    _id: user._id,
                    name: user.name,
                    profilePicture:user.profilePicture
                },
                files:fileData
            }

            res.status(200).send({ success: true, data: resp });
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: true, message: error.message });
    }
})

exports.fetchComment = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { announcementId, id } = req.query;

        const classroom = await Classroom.findOne({ _id: id });
        const announcement = await Announcement.findOne({ _id: announcementId });
        if (!classroom) {
            res.status(404).send({ error: true, message: 'Room not found' });
        }
        else if (!classroom.members.includes(userId) && classroom.adminId != userId) {
            res.status(401).send({ error: true, message: 'unauthorized access request' });
        }
        else if (!announcement) {
            res.status(404).send({ error: true, message: `announcement with provided Id doesn't exist` });
        }
        else if (announcement.classId != id) {
            res.status(401).send({ error: true, message: `announcement doesn't exist in provided room id` })
        }
        else {
            const comments = await Comment.find({ announcementId });

            const commentsWithSender = await Promise.all(comments.map(async (comment) => {
                const commentObj = comment.toObject();
                commentObj.postedBy = await User.findOne({ _id: comment.postedBy }).select('name profilePicture');
                return commentObj;
            }));
            
            const commentsWithFiles = await Promise.all(commentsWithSender.map(async (comment) => {
                const files = await Promise.all(comment.files.map(async (file) => {
                    const base64Data = file.data.toString('base64');
                    return {
                        ...file, // Convert Mongoose document to plain JavaScript object
                        data: base64Data,
                    };
                }));
                return {
                    ...comment, // Convert Mongoose document to plain JavaScript object
                    files,
                };
            }));
            res.status(200).send({ success: true, data: commentsWithFiles });
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: true, message: error.message });
    }
})