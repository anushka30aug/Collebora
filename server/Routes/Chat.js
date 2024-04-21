const express= require('express');
const fetchUser = require('../middleware/fetchUser');
const route = express.Router();
const chat_controller = require('../controllers/ChatController');

route.get('/fetch',fetchUser,chat_controller.fetchChat);

module.exports = route;