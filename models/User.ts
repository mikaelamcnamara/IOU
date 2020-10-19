export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    avatar: {
      type: Number,
      required: true,
      default: 1,
    },

    fullName: {
      type: String,
      required: true, //mandatory attribute
      trim: true, //cuts whitespace at the end of the input field
      minlength: 3, //sets min name length to 3 chars
      default: '',
    },

    email: {
      type: String,
      required: true,
      unique: true, //primary key will be email (already configured in MongoDB Atlas)
      default: '',
    },

    password: {
      type: String,
      required: true,
      default: '',
    },

    emailVerified: {
      //boolean to log if user email has been verified or not
      type: Boolean,
      required: true,
      default: false,
    },

    passwordRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
    //boolean to log if user has requested a new password.
    //without this the forgot password function won't work

    experiencePoints: {
      type: Number,
      required: true,
      default: 0,
    },

    //should the user want to add a description on their profile page
    personalDescription: {
      type: String,
      required: false,
    },

    //favours the user has made
    myFavours: [{ type: Schema.Types.ObjectId, ref: 'favours' }],

    //friends the user has added
    friends: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    //favours the user has completed
    completedFavours: [{ type: Schema.Types.ObjectId, ref: 'favours' }],

    //friends
    myFriends: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    //friends
    myFriend: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true, //Adds last modified and user creation time to MongoDB collection
  }
);

userSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

mongoose.model('users', userSchema);
