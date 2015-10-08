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

var Game = new Schema({
  name: {type: String, unique:true},
  playPassword: String,
  editPassword: String,
  clues: [{type: Schema.Types.ObjectId, ref:'clues'}]

});


module.exports = mongoose.model('games', Game);
