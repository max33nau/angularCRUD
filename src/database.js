'use strict';
var mongoose = require('mongoose');
var my = require('./config/configDBandServer');
var db;
var dbData = {
  start: function start(callback) {
    mongoose.connect(my.dbConnect + my.dbName);
    db = mongoose.connection;
    db.on('error', function (error) {
      console.log(error);
      db.close();
    });
    db.once('open', callback);
  },
  mongoose: mongoose,
  db: db,
};

module.exports = dbData;
