export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const Favour = mongoose.model('favours');
const User = mongoose.model('users');
module.exports = (app) => {
  app.post('/api/logout', (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get('/api/current_user', (req: any, res: any) => {
    res.send(req.session.passport.user);
  });

  app.post('/api/createFavour', (req: any, res: any) => { 
    const body = req.body;
    const title = body.title;
    const description = body.description;
    const assignee = body.assignee;
    const category = body.category;
    const points = body.points;
    const date = body.date;

    const favour = new Favour();
    favour.title = title;
    favour.description = description;
    favour.assignee = assignee;
    favour.category = category;
    favour.points = points;
    favour.date = date;
    favour.save((err: any, favour: any) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Server error',
        });
      } else {
        User.findByIdAndUpdate(req.session.passport.user, {$push: {"myFavours": favour._id}}, {safe: true, new: true, upsert: true}, function(err) { console.log(err); });
        return res.send({
          success: true,
          message: 'Favour created!',
        });
      }
    });
  });
};
