var express = require('express');
var path = require('path');
var logger = require('morgan');
// uncomment after placing your favicon in /public
//var favicon = require('serve-favicon');

// NOTE: On ALL routes, always, ALWAYS check that this user is logged in.

var index = require('./routes/index');
var users = require('./routes/users');

var expressApp = express();

expressApp.set('port', (process.env.PORT || 5000));

expressApp.use(express.static(path.join(__dirname, '/public')));

// view engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
expressApp.use(logger('dev'));
