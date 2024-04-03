const passport = require('passport');
const User = require('./models/user');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/classroom/authentication/google/callback",
      }, 
      async (accessToken, refreshToken, profile, done) => { // Add 'done' as an argument here
        try { 
          let user = await User.findOne({ emailAddress: profile.emails[0].value });
          if (!user) {
            user = await User.create({
              name: profile.displayName,
              emailAddress: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
              googleId: profile.id,
            });
            console.log('New user created:', user);
          } else {
            console.log('User already present:', user);
          }
          done(null, user); 
        } catch (error) {
          done(error); 
        }
    }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
      User.findById(id).then((user)=>{
        done(null,user)
      })
  });

