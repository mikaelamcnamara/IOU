export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/logout', (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get('/api/current_user', (req: any, res: any) => {
    res.send(req.session.passport.user);
  });

  app.post('/api/addFriend', (req: any, res: any) => {
    const friendId = req.friend;
    User.findByIdAndUpdate(req.session.passport.user, {$push: {"friends": friendId}}, {safe: true, upsert: true, new: true}, function(err, model) { 
      if (err) return res.send("Added friend!");
      res.send(err);
    });
  });

  app.post('/api/removeFriend', (req: any, res: any) => {
    const friendId = req.friend;
    User.findByIdAndUpdate(req.session.passport.user, {$pull: {"friends": friendId}}, {safe: true, upsert: true, new: true}, function(err, model) { 
      if (err) return res.send("Added friend!");
      res.send(err);
    });
  });

  app.get('/api/leaderboard', (req: any, res: any) => {
    User.find({}, 'avatar fullName experiencePoints').sort({experiencePoints: -1}).limit(3).exec(function(err, result) {
      if (err) return res.send(err);
      res.send(result);
    });
    
  });
};
