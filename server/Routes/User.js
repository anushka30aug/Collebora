const express = require ('express');
const route  = express.Router();
const fetchUser = require('../middleware/fetchUser');
const user_controller = require('../controllers/UserController')

route.get('/fetch',fetchUser,user_controller.fetchUser);

module.exports = route; 