"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* FUNCTIONS FOR SCHEMA VALIDATION */
function toUpper(value) {
  return value.toUpperCase();
}
function convertToNumber(value) {
  if (isNaN(Number(value))) return 'not number';else return Number(value);
}
function validator(value) {
  return !isNaN(value);
}
var check = [validator, 'You did not enter a number for that stat'];

/* PLAYER SCHEMA */
var PlayerStatsSchema = new Schema({
  name: { type: String, unique: true, required: true, set: toUpper },
  team: { type: String, required: true, set: toUpper },
  age: { type: Number, required: true, set: convertToNumber, validate: check },
  position: { type: String, required: true, set: toUpper },
  rookie: Boolean,
  yearsInTheLeauge:{ type: Number, required: true, set: convertToNumber, validate: check}
});

var player = mongoose.model('Player', PlayerStatsSchema);


module.exports = player;
