export { }; //trick TS into accepting below imports
const mongoose = require("mongoose");
const Favour = mongoose.model("favours");
const User = mongoose.model("users");
const Image = mongoose.model("images");
const fs = require('fs');
const {promisify} = require('util')
const multer = require('multer');
const upload = multer({dest: './uploads/', limits: {
  fileSize: 1000000,
}});

module.exports = (app) => {

  const removeLocalImage = (path, res) => {
    fs.unlinkSync(path);
    return res.redirect('/Favours');
  }
  app.post("/api/photo", upload.single('image_file'), function (req, res) {
    const image = new Image();
    image.data = fs.readFileSync(req.file.path);
    image.contentType = req.file.mimetype;
    image.save(function (err, image) {
      Favour.findByIdAndUpdate(req.body.favour_id, {
        applicant_user: req.session.passport.user,
        applicant_description: req.body.submission,
        applicant_image: image,
      }, { upsert: true }, function (err) {
        if (err) {
          res.send(err);
        } else {
          return removeLocalImage(req.file.path, res);
        }
      })
    });
  })

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
            if (err) res.send(err);
          }
        );
        User.findByIdAndUpdate(
          assignee,
          { $push: { myDebts: favour._id } },
          { safe: true, new: true, upsert: true },
          function (err) {
            if (err) res.send(err);
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
          message: "Removed friend"
        });
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
    const page = req.query.page - 1;
    const description = req.query.description;
    Favour.find({"complete": null, "description": {"$regex": description, "$options": "i"}}).sort({"_id": 1}).skip(page*10).limit(10).populate("creator", "_id avatar fullName").exec(function (err, favs) {
      if (err) return res.send(err);
      Favour.countDocuments({"complete": null, "description": {"$regex": description, "$options": "i"}}).exec(function (err, count) {
        if (err) return res.send(err);
        res.send({
          favours: favs,
          count: count
        })
      })
    });
  })

  app.get('/api/allUsers', (req: any, res: any) => {
    const page = req.query.page - 1;
    const name = req.query.name;
    User.find({"fullName": {"$regex": name, "$options": "i"}}).sort({"_id": 1}).skip(page*10).limit(10).exec(function (err, users) {
      if (err) return res.send(err);
      User.countDocuments({"fullName": {"$regex": name, "$options": "i"}}).exec(function (err, count) {
        if (err) return res.send(err);
        res.send({
          users: users,
          count: count,
        })
      });
    });
  });

  app.get("/api/getFriendNames", (req: any, res: any) => {
    const page = req.query.page - 1;
    const name = req.query.name;
    User.findById(req.session.passport.user).populate({ path: "friends", select: {'fullName': 1, '_id': 1, 'avatar': 1, 'experiencePoints': 1}, match: {"fullName": {"$regex": name, "$options": "i"}}, options: {
      sort: {"_id": 1},
    }}).exec(function (err, result) {
        if (err) return res.send(err);
        res.send({
          users: result.friends,
          count: result.friends.length,
        })
    });
  });

  app.get("/api/getAllFriendNames", (req: any, res: any) => {
    User.findById(req.session.passport.user).populate({ path: "friends", select: {'fullName': 1, "_id": 1}}).exec(function (err, result) {
        if (err) return res.send(err);
        res.send(result.friends);
    });
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
    User.findById(req.session.passport.user, "myDebts fullName").populate({ path: "myDebts", populate: { path: "creator", model: 'users', select: { '_id': 1, 'avatar': 1, 'fullName': 1 } } }).exec(function (err, favours) {
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

  app.get('/api/getMyCompletedFavours', (req: any, res: any) => {
    User.findById(req.session.passport.user, "completedFavours").populate({path: "completedFavours", populate: { path: "creator", select: {"avatar": 1, "fullName": 1}}, options: {
      limit: 10,
      sort: {"_id": 1},
    }})
      .exec(function (err, favours) {
        if (err) return res.send(err);
        res.send(favours);
      })
  })

  app.put('/api/favourApplicant', (req: any, res: any) => {
    Favour.findById(req.body.id).populate("applicant_user applicant_image", "_id avatar fullName").exec(function (err, favour) {
      if (err) return res.send(err);
      Favour.findById(req.body.id).populate("applicant_image").exec(function (err, image) {
        if (err) return res.send(err);
        res.send({ favour, image });
      })
    })
  })

  app.post('/api/declineSubmission', (req: any, res: any) => {
    Favour.findByIdAndUpdate(req.body.id, { applicant_user: null, applicant_description: null, applicant_image: null }).exec(function (err, favour) {
      if (err) return res.send(err);
      Image.findByIdAndDelete(favour.applicant_image).exec(function (err) {
        if (err) return res.send(err);
        res.send({
          success: true,
          message: "Submission declined",
        })
      });
    })
  })

  app.post('/api/acceptSubmission', (req: any, res: any) => {
    const favour = req.body.favour;
    const applicant_id = req.body.applicant_id;
    User.findByIdAndUpdate(applicant_id, { $push: { completedFavours: favour._id }, $inc: { experiencePoints: favour.points } }).exec(function (err) {
      if (err) res.send(err);
    });
    Favour.findByIdAndUpdate(favour._id, {complete: true}).exec(function (err, favour) {
      if (err) return res.send(err);
      Image.findByIdAndDelete(favour.applicant_image).exec(function (err) {
        if (err) return res.send(err);
        res.send({
          success: true,
          message: "Submission accepted",
        })
      });
    });
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
      namesMap.set(iter1.creator._id, { name: iter1.creator.fullName, avatar: iter1.creator.avatar });
      for (let iter2 of JSON.parse(JSON.stringify(iter1.creator.myDebts))) {
        if (visited.has(iter2.creator._id)) continue;
        if (arr.includes(iter2.creator._id)) cycles.push(Array.from(arr));
        arr.push(iter2.creator._id);
        namesMap.set(iter2.creator._id, { name: iter2.creator.fullName, avatar: iter2.creator.avatar });
        for (let iter3 of JSON.parse(JSON.stringify(iter2.creator.myDebts))) {
          if (visited.has(iter3.creator._id)) continue;
          if (arr.includes(iter3.creator._id)) cycles.push(Array.from(arr));
          arr.push(iter3.creator._id);
          namesMap.set(iter3.creator._id, { name: iter3.creator.fullName, avatar: iter3.creator.avatar });
          for (let iter4 of JSON.parse(JSON.stringify(iter3.creator.myDebts))) {
            if (visited.has(iter4.creator._id)) continue;
            if (arr.includes(iter4.creator._id)) cycles.push(Array.from(arr));
            namesMap.set(iter4.creator._id, { name: iter4.creator.fullName, avatar: iter4.creator.avatar });
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
      return a.indexOf(e, i + 1) === -1;
    }).reverse().map(i => JSON.parse(i));

    let final_names = [];
    for (let item of final_cycles) {
      let arr = [];
      item.forEach(i => arr.push(namesMap.get(i)))
      final_names.push(arr);
    }

    //if the current user is null, then there isn't a cycle (i.e. the user has not sent out any favours)
    if (final_names[0] == undefined) return [];
    if (final_names[0][0] == null) return [];
    return final_names;
  }

  app.get('/api/partyFinder', (req: any, res: any) => {
    User.findById(req.session.passport.user, "myDebts").populate({
      path: "myDebts", select: { 'creator': 1 }, populate:
      {
        path: "creator", model: 'users', select: { '_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1 }, populate:
        {
          path: "myDebts", select: { 'creator': 1 }, populate: {
            path: "creator", model: 'users', select: { '_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1 }, populate:
            {
              path: "myDebts", select: { 'creator': 1 }, populate: {
                path: "creator", model: 'users', select: { '_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1 }, populate:
                  { path: "myDebts", select: { 'creator': 1 }, populate: { path: "creator", model: 'users', select: { '_id': 1, 'avatar': 1, 'fullName': 1, 'myDebts': 1 } } }
              }
            }
          }
        }
      }
    }).exec(function (err, debts) {
      return res.send(traversal(debts));
    })

  });

};
