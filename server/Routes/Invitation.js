const express= require('express');
const validateMail = require('../middleware/validateMail');
const fetchUser = require('../middleware/fetchUser');
const route=express.Router();
const controller =require('../controllers/InvitationController.js');

route.post('/send',validateMail,fetchUser,controller.sendMail);

module.exports=route;
