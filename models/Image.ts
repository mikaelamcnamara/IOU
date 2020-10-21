export { }; //trick TS into accepting below imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

mongoose.model('images', imageSchema);