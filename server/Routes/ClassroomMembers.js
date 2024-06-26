const express = require('express');
const route = express.Router();
const members_controller= require('../controllers/ClassroomMemberController');
const fetchUser = require('../middleware/fetchUser');

route.post('/create',fetchUser,members_controller.addMember);

route.get('/fetch/:id',fetchUser,members_controller.fetchMembers);

route.delete('/delete',fetchUser,members_controller.removeMember);

route.delete('/leave',fetchUser,members_controller.leaveRoom);

module.exports = route;



