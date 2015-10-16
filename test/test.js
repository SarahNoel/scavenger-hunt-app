process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var expect = chai.expect;

var Clue = require("../server/models/clue");

var should = chai.should();

chai.use(chaiHttp);

describe('Compare Numbers', function() {
  it('1 should equal 1', function() {
    expect(1).to.equal(1);
  });
});

  describe('Clues', function() {

    Clue.collection.drop();

    beforeEach(function(done){
      var testClue = new Clue({
        name: "Test Clue",
        location: "Central Park",
        answer: "Poochie",
        hints: ["woof woof"]
      });
      testClue.save(function(err) {
        done();
      });
    });
    afterEach(function(done){
      Clue.collection.drop();
      done();
    });

  it('should list ALL clues on /clues GET', function(done) {
    chai.request(server)
      .get('/clues')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('location');
        res.body[0].should.have.property('hints');
        res.body[0].should.have.property('answer');
        res.body[1].name.should.equal('Test Clue');
        res.body[1].location.should.equal('Central Park');
        res.body[1].hints[0].should.equal("woof woof");
        done();
      });
  });

  it('should list a SINGLE clue on /clue/<id> GET', function(done) {
       var newClue = new Clue({
          name: "Test Clue",
          location: "Central Park",
          answer: "Poochie",
          hints: ["woof woof"]
        });
        newClue.save(function(err, data) {
      chai.request(server)
        .get('/clue/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('location');
          res.body.should.have.property('hints');
          res.body.should.have.property('answer');
          res.body.name.should.equal('Test Clue');
          res.body.location.should.equal('Central Park');
          res.body.hints[0].should.equal("woof woof");
          done();
        });
      });
    });

  it('should add a SINGLE clue on /clues POST', function(done) {
    chai.request(server)
      .post('/clues')
      .send({"name": "Test Clue", "location": "Central Park", "answer": "Poochie", "hints": ["woof woof"]})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('location');
        res.body.should.have.property('hints');
        res.body.should.have.property('answer');
        res.body.name.should.equal('Test Clue');
        res.body.answer.should.equal('Poochie');
        res.body.location.should.equal('Central Park');
        res.body.hints[0].should.equal("woof woof");
        done();
      });
  });

  it('should update a SINGLE clue on /clue/<id> PUT', function(done) {
    chai.request(server)
      .get('/clues')
      .end(function(err, res){
        chai.request(server)
          .put('/clue/'+res.body[0]._id)
          .send({'name' : 'Poopy Clue', 'location': 'Central Park', 'hints' : ['woof woof'], 'answer': 'Poochie'})
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('hints');
            res.body.should.have.property('answer');
            res.body.name.should.equal('Poopy Clue');
            res.body.location.should.equal('Central Park');
            done();
        });
      });
  });

  it('should delete a SINGLE clue on /clue/<id> DELETE', function(done) {
    chai.request(server)
      .get('/clues')
      .end(function(err, res){
        chai.request(server)
          .delete('/clue/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('_id');
            response.body.name.should.equal('Test Clue');
            done();
        });
      });
  });

});
