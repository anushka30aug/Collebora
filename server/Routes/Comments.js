const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const route = express.Router();
const controller = require('../controllers/CommentController')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: function (req, file, cb) {
        if (['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('File type not supported'));
        }
    }
});

route.get('/fetch',fetchUser,controller.fetchComment);
route.post('/create',fetchUser,upload.array('files', 3),controller.addComment);

module.exports = route;
