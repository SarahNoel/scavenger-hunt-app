var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Clue = mongoose.model('clues');
var User = mongoose.model('users');
var Game = mongoose.model('games');
var passport = require('passport');
var local = require('passport-local');


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


//make new game
router.post('/games', function(req, res, next) {
  new Game(req.body)
  .save(function(err, game){
    res.json(game);
  });
});

// get all games
router.get('/games', function(req, res, next) {
  Game.find()
    .populate('clues')
    .exec(function(err, games){
    if(err){
    }
    else{
      res.json(games);
    }
  });
});

//get single game information
router.get('/game/:id', function(req, res, next){
  Game.findById(req.params.id)
    .populate('clues')
    .exec(function(err, game){
    if(err){
    }
    else{
      res.json(game);
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
  Game.findByIdAndUpdateQ(id, update, options)
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.send({'Error!' : err});
    })
      .done();
  });

  //get all clues from a game
router.get('/:gameid/clues', function(req, res, next){
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




















router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      return res.status(200).json({status: 'Login succesful!'});
    });
  })(req, res, next);
});


router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Logged out.'});
});





module.exports = router;
