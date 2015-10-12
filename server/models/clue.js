var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Clue = new Schema({
  order: Number,
  name: String,
  location: String,
  answer: Array,
  hints: Array,
  latitude: String,
  longitude: String
});


var Game = new Schema({
  name: {type: String, unique:true},
  playPassword: String,
  editPassword: String,
  clues: [{type: Schema.Types.ObjectId, ref:'clues'}]
});

var User = new Schema({
  username: {type: String, unique:true},
  password: String,
  games: [{type: Schema.Types.ObjectId, ref:'games'}]
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
module.exports = mongoose.model('clues', Clue);
module.exports = mongoose.model('games', Game);
