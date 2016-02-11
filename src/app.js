'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const my = require('./config/configDBandServer');
const dbData = require('./config/database');
const mainPage = require('./routes/route-main');

var app = express();

/**** VIEWS ****/
var viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.set('view engine', 'jade');
app.use( express.static( viewPath, { redirect : false } ) );

/**** PUBLIC ****/
var publicPath = path.join( __dirname, 'public' );
app.use(express.static( publicPath, { redirect : false } ) );


/**** PARSING MODULES FOR APP ****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**** DEBUG FOR DEV ****/
app.use(morgan('dev'));


/**** ROUTES ****/
app.use('/', mainPage());

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
