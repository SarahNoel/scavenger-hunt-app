var express = require('express');
var router = express.Router();
var Clue = require('../models/clue.js');
var User = require('../models/user.js');
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
