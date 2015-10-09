var mongoose = require('mongoose');
var Clue = mongoose.model('clues');
var Game = mongoose.model('games');
var User = mongoose.model('users');


var clue1 = new Clue({
  order: 1,
  name: 'Fluffy Friend',
  location: 'Wash Park',
  answer: ['a dog', 'dog', 'poochie', 'a poochie', 'puppy', 'a puppy', 'canine', 'a canine'],
  hints: ["It's furry", "it should be on a leash", "it barks"],
  latitude: '39.7',
  longitude: '-104.9706'
});


var clue2 = new Clue({
  order: 2,
  name: 'Not Superman',
  location: 'Capital Building',
  answer: ['a flag', 'flag', 'state flag', 'us flag', 'american flag', 'co flag'],
  hints: ["it flies", "it's not alive", "it's made of fabric", "it's on a pole"],
  latitude: '39.739319',
  longitude: '-104.988937'
});

var clue3 = new Clue({
  order: 3,
  name: 'Tex-Mex',
  location: "Wahoo's Fish Tacos",
  answer: ['black beans'],
  hints: ["edible", "in a burrito", "protein", "not meat", "black"],
  latitude: '39.748163',
  longitude: '-104.9863199'
});

var testGame = new Game(
{
  name: 'Test Game',
  playPassword: 'play',
  editPassword: 'edit',
  clues: [clue1._id, clue2._id, clue3._id]
});


var testUser = new User({
  username: 'test@gmail.com',
  password: 'password',
  games: testGame._id
});

function databaseSeed() {
  User.find({}, function(err, documents){
      if(!err && documents.length===0) {
    clue1.save();
    clue2.save();
    clue3.save();
    testGame.save();
    testUser.save();
    console.log("seeded!");
    }
  });

}

module.exports = databaseSeed;

