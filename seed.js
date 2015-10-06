var mongoose = require('mongoose');
var Clue = require('./server/models/clue.js');

var clueSeed = [
{
  order: 1,
  name: 'Fluffy Friend',
  location: 'Wash Park',
  answer: 'a dog',
  hints: ['It barks']
},
{
  order: 1,
  name: 'Not Superman',
  location: 'Capital Building',
  answer: 'a plane',
  hints: ['It flies']
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

