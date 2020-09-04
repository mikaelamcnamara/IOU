export {}; //trick TS into accepting below imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  User.findById(id).then((user: any) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    (email: String, password: String, done: any) => {
      User.findOne({ email: email })
        .then((user: any) => {
          if (!user) {
            return done(null, false, {
              success: false,
              message: 'User does not exist!',
            }); //First param: null error, 2nd: false user, 3rd: error msg
          }
          if (user.emailVerified != true && false) {
            //CHANGE WHEN COMPLETE!!!!
            return done(null, false, {
              success: false,
              message: 'Please verify your email!',
            });
            //First param: null error, 2nd: false user, 3rd: error msg
          }
          //Password match only if user exists
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user, { success: true, message: 'Logged in!' }); //return null for error and return user if password matches hash.
            } else {
              return done(null, false, {
                success: false,
                message: 'Incorrect password entered!',
              });
            }
          });
        })
        .catch((err: any) => console.log(err));
    }
  )
);
