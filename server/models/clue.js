var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Clue = new Schema({
  order: Number,
  name: String,
  location: String,
  answer: String,
  hints: [String]
});

module.exports = mongoose.model('clues', Clue);
