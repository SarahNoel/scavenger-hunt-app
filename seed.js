var mongoose = require('mongoose');
var Clue = require('./server/models/clue.js');

var clueSeed = [
{
  name: 'Clue One',
  location: 'Wash Park',
  answer: 'A dog',
  hints: ['It barks']
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

