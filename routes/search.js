var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var placeholderValues = {
    pageTitle: 'Search Documents',
    welcomeMessage: 'Hello Genie. I need to find...'
  };
  res.render('search');
});

module.exports = router;
