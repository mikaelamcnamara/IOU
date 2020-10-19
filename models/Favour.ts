export {}; //trick TS into accepting below imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const favourSchema = new Schema(
  {
    title: {
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

    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    category: {
      type: String,
      required: true,
    },

    //units TBD
    points: {
      type: Number,
      required: true,
      default: 0,
    },

    date: {
      type: Date,
      ref: 'date',
    },

    applicants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true, //Adds last modified and user creation time to MongoDB collection
  }
);

mongoose.model('favours', favourSchema);
