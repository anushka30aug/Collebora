const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Chat = require('../models/chatroom');
const Message = require('../models/Message');
const mongoose = require('mongoose')

exports.createMessage = asyncHandler(async (req, res) => {
    try {
        const { message, chatId } = req.body;
        const senderId = req.user.id;

        const user = await User.findOne({ _id: senderId })

        if (!user) {
            res.status(404).send({ error: true, message: "user not found" })
        }
        else {
            const chat = await Chat.findOne({ _id: chatId });
            if (!chat) {
                res.status(404).send({ error: true, message: `chats don't exist for this room` })
            }
            else if (!chat.members.includes(senderId)) {
                res.status(401).send({ error: true, message: "Invalid request, You are not member of this chatroom" })
            }
            else {
                let newMessage = await Message.create({
                    senderId,
                    chatId,
                    message
                })
                await newMessage.save();
                newMessage= await newMessage.populate({
                    path: 'senderId',
                    select: 'name profilePicture'
                })
                const chatMessage = {
                    newMessage,
                    members:chat.members
                }
                res.status(200).send({ success: true, message: chatMessage })
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: 'Error while sending the message' })
    }
})

// exports.fetchMessages = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const chatId = req.params.chatId;

//         const chat = await Chat.findOne({ _id: chatId });
//         if (!chat) {
//             return res.status(404).send({ error: true, message: `Chats don't exist` });
//         }

//         if (!chat.members.includes(userId)) {
//             return res.status(401).send({ error: true, message: "Invalid request, You are not a member of this chatroom" });
//         }

//         const messages = await Message.aggregate([
//             { $match: { chatId: new mongoose.Types.ObjectId(chatId) } },
//             {
//                 $addFields: {
//                     dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$dateOnly",
//                     messages: {
//                         $push: {
//                             _id: "$_id",
//                             message: "$message",
//                             senderId: "$senderId",
//                             createdAt: "$createdAt",
//                             readBy: "$readBy" 
//                         }
//                     }
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         // Populate senderId field for each message
//         await Message.populate(messages, {
//             path: 'messages.messages.senderId',
//             select: 'name profilePicture'
//         });

//         res.status(200).send({ success: true, data: messages });
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({ error: true, message: 'Unexpected error occurred' });
//     }
// });

exports.fetchMessages = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const chatId = req.params.chatId;

        const chat = await Chat.findOne({ _id: chatId })
        if (!chat) {
            res.status(404).send({ error: true, message: `Chats don't exist` })
        }
        else {
            if (!chat.members.includes(userId)) {
                res.status(401).send({ error: true, message: "Invalid request, You are not member of this chatroom" })
            }
            else {
                const message = await Message.find({ chatId: chatId }).populate({
                    path: 'senderId',
                    select: 'name profilePicture'
                })
                res.status(200).send({ success: true, data: message })
            }
        }
    }

    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }

})