const asyncHandler = require('express-async-handler');

exports.authFailure = asyncHandler(async (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
})

exports.logout = asyncHandler(async (req, res) => {
    req.logOut();
    res.json({ isAuthenticated: false, user: {} });
})