'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const my = require('./configDBandServer');
const dbData = require('./database');
const stats = require('./routes/routes-stats');
const register = require('./routes/routes-register');
const login = require('./routes/routes-login');
const logout = require('./routes/routes-logout');
const index = require('./routes/routes-home');

var app = express();

/**** VIEWS ****/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**** PUBLIC ****/
var publicPath = path.join( __dirname, 'www/public' );
app.use(express.static( publicPath, { redirect : false } ) );


/**** PARSING MODULES FOR APP ****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**** DEBUG FOR DEV ****/
app.use(morgan('dev'));


/**** ROUTES ****/
app.use('/player', stats());
app.use('/register', register());
app.use('/login', login());
app.use('/logout', logout());
app.use('/home', index());

/**** ERROR HANDLING ****/
app.use(function(request,response,next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});


/**** START THE APP ****/
 module.exports = function start() {
  var mainApp = {};

  mainApp.start = function(callback) {
    var server = app.listen(process.env.PORT || my.serverPort, function () {
      console.log('server is connected');
      dbData.start(function () {
        console.log('connected to database');
        callback();
      });
    });
    return {
      close: function close(callback) {
        server.close(function () {
          dbData.mongoose.connection.close(callback);
        });
      }
    };
  };
  mainApp.app = app;
  return mainApp;
};
