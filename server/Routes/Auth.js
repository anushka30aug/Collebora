const express = require("express");
const passport = require("passport");
const Router = express.Router();
const auth_controller = require('../controllers/AuthController');
const jwt = require('jsonwebtoken');


Router.get("/failed", auth_controller.authFailure);

Router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ));

Router.get(
  '/google/callback',
   passport.authenticate('google', {failureRedirect: '/failed' }),(req,res)=>{
  //  console.log(req.user);
   const payload = {
    id: req.user._id
    
  };
  const secret = process.env.JWT_SECRET;
  // const options = { expiresIn: '1h' };
  // const token = jwt.sign(payload, secret, options);
  const token = jwt.sign(payload, secret);
  res.redirect(`${process.env.CLIENT_URI}?token=${token}`)
  }
);

Router.get("/logout", auth_controller.logout);

module.exports = Router;
