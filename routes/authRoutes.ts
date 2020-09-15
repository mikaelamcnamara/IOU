export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');

module.exports = (app: any) => {
  app.post('/auth/signup', (req: any, res: any) => {
    const body = req.body;
    const inputName = body.fullName; //inputted username
    const password = body.password; //inputted password
    const email = body.email.toLowerCase(); //required to ensure duplicate accounts in MongoDB cannot be created with upper case letters of the same email
    const confirmpass = body.confirmpass;

    if (!inputName) {
      return res.send({
        success: false,
        message: 'Full Name cannot be blank!',
      });
    }

    if (inputName.length < 4) {
      return res.send({
        success: false,
        message: 'Enter a legitimate full name!',
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: 'Email cannot be blank!',
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: 'Password cannot be blank!',
      });
    }

    if (password.length < 8) {
      return res.send({
        success: false,
        message: 'Password cannot be shorter than 8 characters',
      });
    }

    if (!(password == confirmpass)) {
      return res.send({
        success: false,
        message: 'Passwords do not match',
      });
    }

    User.findOne({ email: email }, (err: any, user: any) => {
      //Email check to see if it already exists
      if (user) {
        return res.send({
          success: false,
          message: 'Account already exists',
        });
      }
      //generic email validation test
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(email)) {
        //saving new user in DB
        const newUser = new User();
        newUser.fullName = inputName;
        newUser.email = email.toLowerCase();
        newUser.userType = 'Student';
        newUser.password = newUser.hashPassword(password);
        const currentUserObjID = newUser._id;
        newUser.save((err: any, user: any) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Server error',
            });
          } else {
            return res.send({
              success: true,
              message: 'Account created!',
            });
          }
        });
      } else {
        return res.send({
          success: false,
          message: 'Invalid email',
        });
      }
    });
  });

  app.post('/auth/login', (req: any, res: any, next: any) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: info.success, message: info.message });
      }
      if (user) {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.send({ success: info.success, message: info.message });
        });
      }
    })(req, res, next);
  });
};
