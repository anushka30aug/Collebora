const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const fetchClass = (req, res, next) => {
    const token = req.header('class-token');
    if (!token) {
        return res.status(401).send({ error: true, message: 'invalid request' })
    }
    else {
        try {
            let classData = jwt.verify(token, SECRET_KEY);
            req.class = classData;
            next();
        } catch (error) {
            res.status(400).send({ error: true, message: 'Failed to Add member' })
        }
    }
}

module.exports= fetchClass;