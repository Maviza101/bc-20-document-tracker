var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var placeholderValues = {
    pageTitle: 'Create Document',
    welcomeMessage: 'Talk to the genie. He\'ll create a document for you.'
  };
  res.render('createDocument', placeholderValues);
});

module.exports = router;
