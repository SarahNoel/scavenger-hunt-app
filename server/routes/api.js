var express = require('express');
var router = express.Router();
var Clue = require('../models/clue.js');

// get all clues
router.get('/clues', function(req, res, next) {
  Clue.find(function(err, clues){
    res.json(clues);
  });
});

//get one Clue
router.get('/clue/:id', function(req, res, next) {
  Clue.findById(req.params.id, function(err, clue){
    res.json(clue);
  });
});

//post-add one Clue
router.post('/clues', function(req, res, next) {
  new Clue(req.body)
  .save(function(err, clue){
    res.json(clue);
  });
});

//put-update one Clue
router.put('/clue/:id', function(req, res, next) {
  var query = {'_id':req.params.id};
  var update = req.body;
  var options = {new: true};
  Clue.findOneAndUpdate(query, update, options, function(err, clue){
    res.json(clue);
  });
});

//delete-delete one Clue
router.delete('/clue/:id', function(req, res, next){
  var query = {'_id': req.params.id};
  Clue.findOneAndRemove(query, function(error, clue){
    res.json(clue);
  });
});

module.exports = router;
