const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require("./passport");
const app = express();
const server = require("http").createServer(app);
const port = 5000||process.env.port;
const main = require('./connect');

main().then(() => {
    console.log('Connected to DB'); 
}).catch((error) => {
    console.log('Not connected to DB ' + error);
});

app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(express.urlencoded({ extended: true }));

const io = require("socket.io")(server, {
    cors: {
      origin: "*", // Adjust this to your frontend URL in production
      methods: ["GET", "POST"],
    },
  });

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
app.use('/classroom/message',require('./Routes/Message'))
app.use('/classroom/invitation',require('./Routes/Invitation'))
app.use('/classroom/announcement/comments',require('./Routes/Comments'));

io.on( "connection", (socket) => {
    console.log("Connected to socket.io")
    
     socket.on('setup',(userId)=>{
        socket.join(userId);
        console.log(userId);
        // socket.emit('connected',userId)
     })
     socket.on("check", ((data)=>{
         console.log(data.ullu)
     }))

     socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.newMessage.chatId;
        console.log(newMessageRecieved)
        if (!newMessageRecieved.members) return console.log("chat users not defined");
    
        newMessageRecieved.members.forEach((membersId) => {
          if (membersId == newMessageRecieved.newMessage.senderId) return;
          console.log(membersId)
          socket.in(membersId).emit("message received", newMessageRecieved.newMessage);
        })
      })

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
      
    });

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});