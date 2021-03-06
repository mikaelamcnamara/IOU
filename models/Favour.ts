export { }; //trick TS into accepting below imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const favourSchema = new Schema(
  {
    title: {
      type: String,
      required: true, //mandatory attribute
      trim: true, //cuts whitespace at the end of the input field
      minlength: 3, //sets min name length to 3 chars
      maxlength: 20,
      default: '',
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
      default: '',
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'users',
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
      default: 1,
      minlength: 1,
      maxlength: 250,
    },

    date: {
      type: Date,
      ref: 'date',
    },

    complete: {
      type: Boolean,
    },

    applicant_user: { type: Schema.Types.ObjectId, ref: 'users' },
    applicant_description: { type: String },
    applicant_image: { type: Schema.Types.ObjectId, ref: 'images' },
  },
  {
    timestamps: true, //Adds last modified and user creation time to MongoDB collection
  }
);

mongoose.model('favours', favourSchema);
