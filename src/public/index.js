'use strict';

var start = require('.././app');
var mainApp = start();

var server = mainApp.start(function(){
  console.log('app is running');
});
