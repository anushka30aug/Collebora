const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const classroom_controller= require('../controllers/ClassroomContoller');
const fetchUser = require('../middleware/fetchUser'); 
 
route.post('/create',[body('name').isLength({ max:30 ,min:3 }).withMessage('name should be maximum of length 30 and minimum of 3'),body('classId').isLength({ min:5,max:7 }).withMessage('minimum length of RoomId should be 5-7'),body('classcode').isLength({ min:6 }).withMessage('minimum length of code should be 6')],fetchUser,classroom_controller.createClassroom )

route.get('/read',fetchUser,classroom_controller.fetchClassroom);

route.get('/readAsAdmin',fetchUser,classroom_controller.fetchClassroomAsAdmin)

route.put('/update/:id',fetchUser,classroom_controller.updatedClassroom)

route.delete('/delete',fetchUser,classroom_controller.deleteClassroom)

route.post('/archive',fetchUser,classroom_controller.toogle_Archive)

module.exports = route;  