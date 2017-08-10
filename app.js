var express = require('express');
var app = express();
var morgan       = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser   = require('body-parser');
var flash    = require('connect-flash');
var session = require('express-session');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(express.static('public'));

app.set('view engine', 'jade');


app.use(cookieParser('frutiniisbest')); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(session({
  secret: 'frutiniisbest',
  store: require('mongoose-session')(mongoose)
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);

require('./routes/index.js')(app, passport);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
