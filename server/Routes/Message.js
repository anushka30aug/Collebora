const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const route = express.Router();
const message_controller = require('../controllers/MessageController')

route.post('/create',fetchUser,message_controller.createMessage)
route.get('/read/:chatId',fetchUser , message_controller.fetchMessages)
module.exports = route;