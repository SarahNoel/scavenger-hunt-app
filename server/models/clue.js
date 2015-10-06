var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Clue = new Schema({
  order: Number,
  name: String,
  location: String,
  answer: Array,
  hints: Array,
  latitude: String,
  longitude: String
});

module.exports = mongoose.model('clues', Clue);
