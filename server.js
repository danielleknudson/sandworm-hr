var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Stocks = require('./db/collections/stocks');
var Stock = require('./db/models/stock');
var Portfolio = require('./db/models/portfolio');

var authRouter = require('./routes/auth');

var app = express();
app.use(session({
  secret: 'SPLEWT',
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);


app.get('/signout', function(req, res){
  req.session.destroy();
  res.send(202);
});

app.post('/signin',
  passport.authenticate('local'), function(req, res) {
    res.send('success!');
  }
);

app.post('/signup', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username}).fetch().then(function(found){
    if(found){
      res.status(400).send('username exists');
    } else {
      var user = new User({
        username: username,
        password: password
      });
      user.save().then(function(newUser){
        passport.authenticate('local') (req, res, function() {
          res.send(newUser);
        });
      });
    }
  });

});

app.get('/portfolios', function(req, res) {
  var id = req.user.id;
  new Portfolio().query('where', 'users_id', '=', id).fetchAll().then(function(portfolios) {
    res.send(portfolios);
  });
});

app.post('/portfolios', function(req, res) {
  var name = req.body.name;
  var id = req.user.id;
  new Portfolio({'name': name, 'users_id': id}).save().then(function(newPortfolio) {
    res.send(newPortfolio);
  });
});

app.post('/stock', function(req, res) {
  new Stock(req.body).save().then(function(newStock) {
    res.send(newStock);
  });
});

app.post('/stocks', function(req, res) {
  var id = req.body.id;
  new Stock().query('where','portfolios_id', '=', id).fetchAll().then(function(stocks) {
    res.send(stocks);
  });
});

app.use('/api/stocks', handler.getStocks);

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening to: ' + port);