export { }; //trick TS into accepting below imports
const mongoose = require("mongoose");
const Favour = mongoose.model("favours");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/logout", (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get('/api/current_user', (req: any, res: any) => {
    User.findById(req.session.passport.user).select('email fullName').exec(function (err, user) {
      if (err) return res.send(err);
      res.send(user);
    });
  });


  app.put('/api/current_user', (req: any, res: any) => {
    User.findByIdAndUpdate(req.session.passport.user, { email: req.body.email, fullName: req.body.fullName }, { upsert: true }, function (err) {
      if (err) {
        console.log("Error");
        res.send(err)
      }
      else {
        console.log(req.body.fullName);
        return res.send({
          success: true,
          message: 'Successfully updated!',
        }
        )
      }
    })
  })
  app.get("/api/current_user", (req: any, res: any) => {
    res.send(req.session.passport.user);
  });

  app.post("/api/createFavour", (req: any, res: any) => {
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
          message: "Server error",
        });
      } else {
        User.findByIdAndUpdate(
          req.session.passport.user,
          { $push: { myFavours: favour._id } },
          { safe: true, new: true, upsert: true },
          function (err) {
            console.log(err);
          }
        );
        return res.send({
          success: true,
          message: "Favour created!",
        });
      }
    });
  });

  app.post("/api/addFriend", (req: any, res: any) => {
    const friendId = req.friend;
    User.findByIdAndUpdate(
      req.session.passport.user,
      { $push: { friends: friendId } },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) return res.send("Added friend!");
        res.send(err);
      }
    );
  });

  app.post("/api/removeFriend", (req: any, res: any) => {
    const friendId = req.friend;
    User.findByIdAndUpdate(
      req.session.passport.user,
      { $pull: { friends: friendId } },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) return res.send("Added friend!");
        res.send(err);
      }
    );
  });

  app.get("/api/leaderboard", (req: any, res: any) => {
    User.find({}, "avatar fullName experiencePoints")
      .sort({ experiencePoints: -1 })
      .limit(3)
      .exec(function (err, result) {
        if (err) return res.send(err);
        res.send(result);
      });
  });
};

