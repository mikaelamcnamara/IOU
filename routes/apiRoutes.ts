import { createUnionOrIntersectionTypeNode } from 'typescript';

export {}; //trick TS into accepting below imports
const mongoose = require("mongoose");
const Favour = mongoose.model("favours");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/logout", (req: any, res: any) => {
    req.logout(); //kills cookie
    res.send(req.session.passport.user);
  });

  app.get("/api/current_user", (req: any, res: any) => {
    User.findById(req.session.passport.user)
      .select("avatar email fullName experiencePoints completedFavours")
      .exec(function (err, user) {
        if (err) return res.send(err);
        res.send(user);
      });
  });

  app.put("/api/current_user", (req: any, res: any) => {
    User.findByIdAndUpdate(
      req.session.passport.user,
      { email: req.body.email, fullName: req.body.fullName },
      { upsert: true },
      function (err) {
        if (err) {
          console.log("Error");
          res.send(err);
        } else {
          return res.send({
            success: true,
            message: "Successfully updated!",
          });
        }
      }
    );
  });
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
    favour.creator = req.session.passport.user;
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
        User.findByIdAndUpdate(
          assignee,
          { $push: { myDebts: favour._id } },
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

  app.post("/api/addFriend", async (req: any, res: any) => {
    const friendId = req.body.friend;

    User.findById(req.session.passport.user, "friends").exec((err, list) => {
      if (err || list.friends.find(friend => friend == friendId) !== undefined) return res.send({
        success: false,
        message: "Friend already added!",
      });
      User.findByIdAndUpdate(
        req.session.passport.user,
        { $push: { friends: friendId } },
        { safe: true, upsert: true, new: true },
        function (err) {
          if (err) return res.send({
            success: false,
            message: 'Server error'
          });
          res.send({
            success: true,
            message: "Added friend!"
          });
        }
      );
    });
  });

  app.post("/api/removeFriend", (req: any, res: any) => {
    const friendId = req.body.friend;
    User.findByIdAndUpdate(
      req.session.passport.user,
      { $pull: { friends: friendId } },
      { safe: true, upsert: true, new: true },
      function (err) {
        if (err) return res.send(err);
        res.send({
          success: true,
          message: "Removed friend"});
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
  //Integrate pagination for this back-end call
  app.get('/api/allFavours', (req: any, res: any) => {
    Favour.find({}).populate("creator", "_id avatar fullName").exec(function (err, favours) {
      if (err) return res.send(err);
      res.send(favours);
    });
  })

  app.get('/api/allUsers', (req: any, res: any) => {
    User.find({}, function (err, users) {
      if (err) return res.send(err);
      res.send(users);
    });
  });

  app.get("/api/getFriendNames", (req: any, res: any) => {
    User.findById(req.session.passport.user).populate("friends", 'fullName _id avatar experiencePoints').exec(function (err, result) {
        if (err) return res.send(err);
        res.send(result.friends);
      })
  });

  app.get("/api/getAvatar", (req: any, res: any) => {
    User.findById(req.session.passport.user, "avatar")
      .exec(function (err, result) {
        if (err) return res.send(err);
        res.send(result);
      });
  });
  
  app.post("/api/removeFavour", async (req: any, res: any) => {
    User.findByIdAndUpdate(
      req.session.passport.user,
      { $pull: { myFavours: req.body.favourId } },
      { safe: true, upsert: true, new: true },
      function (err) {
        if (err) return res.send({
          success: false,
          message: err,
        });
        res.send({
          success: true,
          message: "Remove successful!",
        });
      }
    );

    Favour.findById(req.body.favourId, function (err, favour) {
      Favour.findByIdAndDelete(req.body.favourId, function (err) {
        User.findByIdAndUpdate(favour.assignee, { $pull: { myDebts: req.body.favourId } }, { safe: true, upsert: true, new: true }, function (err) {
          if (err) return res.send(err);
        })
      });
    })
  });

  app.get('/api/getMyFavours', (req: any, res: any) => {
    User.findById(req.session.passport.user, "myFavours fullName avatar").populate("myFavours").exec(function (err, favours) {
      if (err) return res.send(err);
      res.send(favours);
    })
  });

  app.get('/api/getMyDebts', (req: any, res: any) => {
    User.findById(req.session.passport.user, "myDebts fullName").populate({path: "myDebts", populate: {path: "creator", model: 'users', select: {'_id': 1, 'avatar': 1, 'fullName': 1}}}).exec(function (err, favours) {
      if (err) return res.send(err);
      res.send(favours)
    })
  })

  app.put('/api/favour', (req: any, res: any) => {
    Favour.findById(req.body.id).populate("creator", "_id avatar fullName").exec(function (err, favour) {
      if (err) return res.send(err);
      res.send(favour);
    })
  })

  //detect parties of 3-5 people in size;
  const traversal = (data) => {
    let cycles = [];
    let arr = [];
    let visited = new Set();
    let namesMap = new Map();
    arr.push(data._id);
    
    for (let iter1 of JSON.parse(JSON.stringify(data.myDebts))) {
      if (visited.has(iter1.creator._id)) continue;
      arr.push(iter1.creator._id);
      namesMap.set(iter1.creator._id, {name: iter1.creator.fullName, avatar: iter1.creator.avatar});
      for (let iter2 of JSON.parse(JSON.stringify(iter1.creator.myDebts))) {
        if (visited.has(iter2.creator._id)) continue;
        if (arr.includes(iter2.creator._id)) cycles.push(Array.from(arr));
        arr.push(iter2.creator._id);
        namesMap.set(iter2.creator._id, {name: iter2.creator.fullName, avatar: iter2.creator.avatar});
        for (let iter3 of JSON.parse(JSON.stringify(iter2.creator.myDebts))) {
          if (visited.has(iter3.creator._id)) continue;
          if (arr.includes(iter3.creator._id)) cycles.push(Array.from(arr));
          arr.push(iter3.creator._id);
          namesMap.set(iter3.creator._id, {name: iter3.creator.fullName, avatar: iter3.creator.avatar});
          for (let iter4 of JSON.parse(JSON.stringify(iter3.creator.myDebts))) {
            if (visited.has(iter4.creator._id)) continue;
            if (arr.includes(iter4.creator._id)) cycles.push(Array.from(arr));
            namesMap.set(iter4.creator._id, {name: iter4.creator.fullName, avatar: iter4.creator.avatar});
          }
          arr.pop();
          visited.add(iter3.creator._id);
        }
        arr.pop();
        visited.add(iter2.creator._id);
      }
      arr.pop();
      visited.add(iter1.creator._id);
    }
    let final_cycles = [];
    for (let item of JSON.parse(JSON.stringify(cycles))) {
      let dist = new Set(item);
      if (dist.size >= 3) final_cycles.push(Array.from(dist));
    }

    final_cycles = final_cycles.map(i => JSON.stringify(i)).reverse().filter(function (e, i, a) {
      return a.indexOf(e, i+1) === -1;
    }).reverse().map(i => JSON.parse(i));

    let final_names = [];
    for (let item of final_cycles) {
      let arr = [];
      item.forEach(i => arr.push(namesMap.get(i)))
      final_names.push(arr);
    }

    //if the current user is null, then there isn't a cycle (i.e. the user has not sent out any favours)
    if (final_names[0][0] == null) return [];
    return final_names;
  }

  app.get('/api/partyFinder', (req: any, res: any) => {
    User.findById(req.session.passport.user, "myDebts").populate({path: "myDebts", select: {'creator': 1}, populate: 
      {path: "creator", model: 'users', select: {'_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1}, populate: 
      {path: "myDebts", select: {'creator': 1}, populate: {path: "creator", model: 'users', select: {'_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1}, populate: 
      {path: "myDebts", select: {'creator': 1}, populate: {path: "creator", model: 'users', select: {'_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1}, populate: 
      {path: "myDebts", select: {'creator': 1}, populate: {path: "creator", model: 'users', select: {'_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1}}}}}}}}}).exec(function (err, debts) {
        return res.send(traversal(debts));
      })
        
  });
    
};
