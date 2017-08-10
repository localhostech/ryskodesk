
var User = require('../models/user');

module.exports = function(app, passport) {

    app.post('/register', function(req, res) {
      console.log(req.body);
      User.register(new User({ username : req.body.login, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, spec: req.body.spec, status: req.body.status}), req.body.password, function(err, account) {
          if (err) {
            console.log('Error or username taken! Sorry(');
            res.send({'result': {'success': false, 'message': err}});
          } else {
            res.send({'result': {'success': true}});
          }
      });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        console.log(req.user);
        res.send({'result':{'success':true}})
    });

    app.get('/register', function (req, res) {
      res.render('index', { title: 'RYSKO Desk'});
    });
    app.get('/desk', isLoggedIn, function (req, res) {
      res.render('index', { title: 'RYSKO Desk', user: req.user});
    });
    app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
    });

    app.get('/', function (req, res) {
      if (req.isAuthenticated()) {
        res.redirect('/desk');
      } else {
          res.render('index', { title: 'RYSKO Desk'});
      }
    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
