
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
    app.post('/api/:method', function(req, res) {
      var result = [];
      var message = "";
      var success = false;
      switch (req.params.method) {
        case "getTasks":
          /*
            Get all tasks;
          */
          console.log('Gettin tasks');
          if (!req.body.userOnly) {
            /*
              Return all tasks;
            */
            Task.find({}).sort({created: -1}).exec(function(err, tasks) {
              console.log(tasks);
              result = tasks;
              success = true;
              respond();
            })
          } else {
            /*
              Return only tasks where user is responsible or implementor
            */
            Task.find({$or: [{_responsible: req.user._id}, {_implements: req.user._id}]}).sort({created: -1}).exec(function(err, tasks) {
              console.log(tasks);
              result = tasks;
              success = true;
              respond();
            })
          }
          break;
        case "getUser":
          /*
            Get current user from session
          */
          if (req.user) {
            success = true;
            result = req.user;
          } else {
            success = false;
            message = "User is not found";
          }
          respond();
          break;
        case "getUsers":
          /*
            Get all users;
          */
          User.find({}).exec(function(err, users) {
            console.log(users);
            if (!err) {
                result = users;
                success = true;
            } else {
                success = false;
                message = err;
            }
            respond();
          });
          break;

        case "getTask":
          /*
            Get task by id
          */
          var taskId = req.body.id;

          Task.findOne({_id:taskId}).exec(function(err, task) {
            console.log(task);
            result = task;
            success = true;
            respond();
          });
          break;
        case "removeTask":
          /*
            Remove task by id
          */
          var taskId = req.body.taskid;
          console.log(taskId);
          Task.remove({_id:taskId}).exec(function(err) {
            if (!err) {
              Task.find({}).sort({created: -1}).exec(function(err, tasks) {
                result = tasks;
                success = true;
                respond();
              })
            }
          })
          break;
        case "doneTask":
          /*
            Mark task as done
          */
          var taskId = req.body.taskid;
          console.log(taskId);
          Task.update({_id:taskId}, { $set: { doneMessage: req.body.message }}).exec(function(err) {
            if (!err) {
              Task.find({}).sort({created: -1}).exec(function(err, tasks) {
                console.log(tasks);
                result = tasks;
                success = true;
                respond();
              })
            }
          })
          break;
        case "addtask":
          /*
            Add task to database;
          */
          var taskData = req.body;
          taskData['_author'] = req.user._id;
          var task = new Task(taskData);
          task.save(function(err) {
            if (err) {
              console.log(err)
              success = false;
              respond();
            } else {
              success = true;
              respond();
            }
          });
          break;
        default:
          /*
            Default throwback if requred method does not exist
          */
          result = [];
          message = "API Method is invalid";
          success = false;
          respond();
      }
      function respond() {
          res.send({success: success, result: result, message: message});
      }
    });

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
