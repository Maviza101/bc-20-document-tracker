var express = require('express');
var expressApp = express();

expressApp.set('port', (process.env.PORT || 5000));

expressApp.use(express.static(__dirname + '/public'));

// views is directory for all template files
expressApp.set('views', __dirname + '/views');
expressApp.set('view engine', 'ejs');

expressApp.get('/', function(request, response) {
  response.render('pages/index')
});

expressApp.get('/cool', function(request, response) {
  response.send(cool());
});

expressApp.listen(expressApp.get('port'), function() {
  console.log('Node app is running on port', expressApp.get('port'));
});
