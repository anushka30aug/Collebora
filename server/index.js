const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require("./passport");
const app = express();
const port = 5000;
const main = require('./connect');

main().then(() => {
    console.log('Connected to DB'); 
}).catch((error) => {
    console.log('Not connected to DB ' + error);
});

app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'Classroom_session',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/classroom/authentication', require('./Routes/Auth'));
app.use('/classroom/user', require('./Routes/User'));
app.use('/classroom/actions', require('./Routes/Classroom'));
app.use('/classroom/members/actions', require('./Routes/ClassroomMembers'));
app.use('/classroom/announcement', require('./Routes/Announcement'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});