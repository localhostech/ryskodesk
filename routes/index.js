
var User = require('../models/user');
var Task = require('../models/task');

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


    app.post('/getUser', function(req,res) {
      res.send(req.user);
    });

    app.post('/getUsers', function(req,res) {
      User.find({}).exec(function(err, users) {
        console.log(users);
        res.send(users);
      })
    })

    app.post('/getTasks', function(req,res) {
      if (!req.body.userOnly) {
        Task.find({}).sort({created: -1}).exec(function(err, tasks) {
          console.log(tasks);
          res.send(tasks);
        })
      } else {
        Task.find({$or: [{_responsible: req.user._id}, {_implements: req.user._id}]}).sort({created: -1}).exec(function(err, tasks) {
          console.log(tasks);
          res.send(tasks);
        })
      }
    })

    /* Retrieve one task */
    app.post('/getTask', function(req,res) {
      var taskId = req.body.id;

      Task.findOne({_id:taskId}).exec(function(err, tasks) {
        console.log(tasks);
        res.send(tasks);
      })
    })

    app.post('/removeTask', function(req,res) {
      var taskId = req.body.taskid;
      console.log(taskId);
      Task.remove({_id:taskId}).exec(function(err) {
        if (!err) {
          Task.find({}).sort({created: -1}).exec(function(err, tasks) {
            console.log(tasks);
            res.send(tasks);
          })
        }
      })
    })

    app.post('/login', passport.authenticate('local'), function(req, res) {
        console.log(req.user);
        res.send({'result':{'success':true}})
    });

    app.get('/task/:taskid', function (req, res) {
      res.render('index', { title: 'RYSKO Desk'});
    });
    app.get('/mytasks', function (req, res) {
      res.render('index', { title: 'RYSKO Desk'});
    });

    app.get('/register', function (req, res) {
      res.render('index', { title: 'RYSKO Desk'});
    });
    app.get('/addtask', function (req, res) {
      res.render('index', { title: 'RYSKO Desk'});
    });
    app.post('/addtask', function (req, res) {
      var taskData = req.body;
      taskData['_author'] = req.user._id;
      var task = new Task(taskData);
      task.save(function(err) {
        if (err) {
          console.log(err)
          res.send({'result':{'success':false}})
        } else {
          res.send({'result':{'success':true}});
        }
      });
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
