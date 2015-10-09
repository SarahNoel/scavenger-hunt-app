var express = require('express');
var router = express.Router();
var mongoose =  require('mongoose-q')(require('mongoose'));
var Clue = mongoose.model('clues');
var User = mongoose.model('users');
var Game = mongoose.model('games');


                        ///CLUES///
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

//get one Clue by order number
router.get('/clueNum/:id', function(req, res, next) {
  var query = {order: req.params.id};
  Clue.findOne(query, function(err, clue){
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



                        ///GAMES///

//save new game to user
router.post('/game/:userid', function(req, res, next) {
  var newGame = new Game(req.body);
  newGame.save();
  var id = req.params.userid;
  var update = {$push:{games : newGame}};
  var options = {new:true};
  User.findByIdAndUpdateQ(id, update, options)
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.send({'Error!' : err});
    })
      .done();
  });


//delete one game
router.delete('/game/:gameid', function(req, res, next){
  var query = {'_id': req.params.gameid};
  Game.findOneAndRemove(query, function(error, game){
    res.json(game);
  });
});

//get one Game
router.get('/game/:id', function(req, res, next) {
  Game.findById(req.params.id, function(err, game){
    res.json(game);
  });
});

//put-update one Game
router.put('/game/:id', function(req, res, next) {
  var query = {'_id':req.params.id};
  var update = req.body;
  var options = {new: true};
  Game.findOneAndUpdate(query, update, options, function(err, game){
    res.json(game);
  });
});


//get all games from a user
router.get('/game/user/:userid', function(req, res, next){
  console.log('hiiiii');
  console.log(req.user);
 User.findById(req.params.userid)
  .populate('games')
  .exec(function(err, games){
    if(err){
      res.json(err);
    }
    else{
      res.json(games);
    }
  });
});

//get all clues from a game
router.get('/gameclues/:gameid', function(req, res, next){
 Game.findById(req.params.gameid)
  .populate('clues')
  .exec(function(err, game){
    if(err){
      res.json(err);
    }
    else{
      res.json(game.clues);
    }
  });
});

//save clue to game
router.post('/clues/:gameid', function(req, res,next){
  var newClue = new Clue(req.body);
  newClue.save();
  var id = req.params.gameid;
  var update = {$push:{clues : newClue}};
  var options = {new:true};
  Game.findByIdAndUpdate(id, update, options)
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.send({'Error!' : err});
    })
      .done();
  });

module.exports = router;
