const nodemailer = require('nodemailer');
const password = process.env.NODEMAILER_PASSWORD;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {  
        user: "anushkashukla3003@gmail.com",
        pass: password, 
    },
});
module.exports=transporter; 
