export{};
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const multer = require('multer');

require('./models/User');
require('./models/Favour');
require('./models/Image');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, //set to false to avoid issues with findOneAndUpdate() this must be set to false, otherwise update code will be deprecated
});

const app = express();

//Confirm connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established!');
});

app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, //represented in milliseconds (cookie will expire in a day)
    keys: [keys.cookieKey],
  })
);

//Middleware
app.use(cors()); //Node.js middleware package used for providing express with ability to use cross origin resource sharing (e.g. inter-domain image sharing)
app.use(express.json()); //Express is better at parsing json and bodyParser is included by default to retrieve form data
app.use(passport.initialize()); //initialise passport authentication strategy
app.use(passport.session()); //initialise session
//app.use(multer({ dest: './uploads/', rename: function (fieldname, filename) {
//  return filename;
//},}).single('photo')); //image storage

require('./routes/apiRoutes')(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5001;
//May need to change above depending on deployment strategy
app.listen(PORT);
