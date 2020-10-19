export { };
const mongoose = require("mongoose");
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/logout', (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get('/api/current_user', (req: any, res: any) => {
    User.findById(req.session.passport.user).select('email fullName').exec(function (err, user) {
      if (err) return res.send(err);
      res.send(user);
    });
  });
};

