const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Classroom = require('../models/classroom');

exports.fetchUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).send({ error: true, message: 'user not found' })
        }
        else {
            res.status(200).send({ success: true, data: user });
        }
    }
    catch (error) {
        res.status(400).send({ error: true, message: "Internal Server Error" })
    }
});

