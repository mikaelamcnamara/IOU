export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const favourSchema = new Schema(
  {
    name: {
      type: String,
      required: true, //mandatory attribute
      trim: true, //cuts whitespace at the end of the input field
      minlength: 3, //sets min name length to 3 chars
      default: '',
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      default: '',
    },

    //units TBD
    duration: {
      type: Number,
      required: true,
      default: 0,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    applicants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true, //Adds last modified and user creation time to MongoDB collection
  }
);

mongoose.model('favours', favourSchema);
