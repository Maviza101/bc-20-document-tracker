'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var placeholderValues = {
      pageTitle: 'Andela Document Tracker',
      welcomeMessage: 'Welcome to the Andela Document Tracker.'
  };
  res.render('index', placeholderValues);
});

module.exports = router;
