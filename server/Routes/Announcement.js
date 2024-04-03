const express = require('express')
const route = express.Router();
const fetchUser = require('../middleware/fetchUser');
const multer = require('multer');
// const path = require('path')
const announcement_controller = require('../controllers/AnnouncementController')
  
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


route.post('/create', fetchUser, upload.array('files', 3), announcement_controller.makeAnnouncement);
route.get('/fetch', fetchUser, announcement_controller.fetchAnnouncement);

module.exports = route;