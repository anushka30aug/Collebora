const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatroom');
const Message = require('../models/Message');


exports.fetchChat = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const chatId = req.body.chatId;

        const chat = await Chat.findOne({ _id: chatId })
        if (!chat) {
            res.status(404).send({ error: true, message: `Chats don't exist` })
        }
        else {
            if (!chat.members.includes(userId)) {
                res.status(401).send({ error: true, message: "Invalid request, You are not member of this chatroom" })
            }
            else {
                const message = await Message.find({ chatId: chatId })
                res.status(200).send({ success: true, data: message })
            }
        }

    }
    catch (error) {
        res.status(400).send({ error: true, message: 'unexpected error occured' })
    }

})