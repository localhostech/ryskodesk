var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
app.get('/register', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
