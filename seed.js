var mongoose = require('mongoose');
var Clue = require('./server/models/clue.js');

var clueSeed = [
{
  order: 1,
  name: 'Fluffy Friend',
  location: 'Wash Park',
  answer: ['a dog', 'dog', 'poochie', 'a poochie', 'puppy', 'a puppy', 'canine', 'a canine'],
  hints: ["It's furry", "it should be on a leash", "it barks"],
  latitude: '39.7',
  longitude: '-104.9706'
},
{
  order: 2,
  name: 'Not Superman',
  location: 'Capital Building',
  answer: ['a flag', 'flag', 'state flag', 'us flag', 'american flag', 'co flag'],
  hints: ["it flies", "it's not alive", "it's made of fabric", "it's on a pole"],
  latitude: '39.739319',
  longitude: '-104.988937'
},
{
  order: 3,
  name: 'Tex-Mex',
  location: "Wahoo's Fish Tacos",
  answer: ['black beans'],
  hints: ["edible", "in a burrito", "protein", "not meat", "black"],
  latitude: '39.748163',
  longitude: '-104.9863199'
}

];

function databaseSeed() {
  Clue.find({}, function(err, documents){
    if(!err && documents.length===0) {
      for (var i = 0; i < clueSeed.length; i++) {
        var newClue = new Clue(clueSeed[i]);
        newClue.save(function(err, success){
          if(!err) {
            console.log('database object seeded.');
          }
        });
      }
    }
  });
}

module.exports = databaseSeed;

