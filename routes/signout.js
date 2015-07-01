var express = require('express');
var session = require('express-session');
var signoutRouter = express.Router();
signoutRouter.get('/', function (req, res) {
  req.session.destroy();
  res.send(202);
  res.redirect('/');
});
module.exports = signoutRouter;