const { body, validationResult } = require('express-validator');

const validateMail = [
    body('emails')
        .isArray({ max: 10 }).withMessage('Emails should be an array with a maximum of 10 items')
        .custom(emails => {
            for (let email of emails) {
                if (!body(email).isEmail().bail()) {
                    throw new Error(`Invalid email: ${email}`);
                }
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateMail;
