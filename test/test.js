// process.env.NODE_ENV = 'test';

// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var mongoose = require("mongoose");

// var server = require('../server/app');
// var expect = chai.expect;

// var Student = require("../server/models/student");

// var should = chai.should();
// chai.use(chaiHttp);

// describe('Compare Numbers', function() {
//   it('1 should equal 1', function() {
//     expect(1).to.equal(1);
//   });
// });

// describe('Students', function() {

//   Student.collection.drop();

//   beforeEach(function(done){
//     var testStudent = new Student({
//       name: "Billy",
//       gender: "Male",
//       picture: "www.google.com",
//       restrictions: ['Shelly']
//     });
//     testProject.save(function(err) {
//       done();
//     });
//   });
//   afterEach(function(done){
//     Project.collection.drop();
//     done();
//   });

//   it('should list ALL projects on /projects GET', function(done) {
//     chai.request(server)
//       .get('/api/v1/projects')
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('array');
//         res.body[0].should.have.property('_id');
//         res.body[0].should.have.property('name');
//         res.body[0].should.have.property('description');
//         res.body[0].should.have.property('tags');
//         res.body[0].should.have.property('group');
//         res.body[0].should.have.property('group_members');
//         res.body[0].name.should.equal('Test Project');
//         res.body[0].description.should.equal('For testing');
//         res.body[0].group.should.equal(false);
//         res.body[0].tags[0].should.equal("test, practice");
//         done();
//       });
//   });

// //   it('should list a SINGLE project on /project/<id> GET', function(done) {
// //       var newProject = new Project({
// //         name: "Group Project",
// //         description: "Group work!",
// //         tags: ['work, patience'],
// //         group: true,
// //         group_members: ['Shanna, Betsy']
// //       });
// //       newProject.save(function(err, data) {
// //         chai.request(server)
// //           .get('/api/v1/project/'+data.id)
// //           .end(function(err, res){
// //             res.should.have.status(200);
// //             res.should.be.json;
// //             res.body.should.be.a('object');
// //             res.body.should.have.property('_id');
// //             res.body.should.have.property('description');
// //             res.body.should.have.property('tags');
// //             res.body.should.have.property('group');
// //             res.body.should.have.property('group_members');
// //             res.body.name.should.equal('Group Project');
// //             res.body.description.should.equal('Group work!');
// //             res.body.group.should.equal(true);
// //             res.body.tags[0].should.equal("work, patience");
// //             done();
// //           });
// //       });
// //   });

// // var newProject = new Project({
// //         name: "Group Project",
// //         description: "Group work!",
// //         tags: ['work, patience'],
// //         group: true,
// //         group_members: ['Shanna, Betsy']
// //       });
// //   it('should add a SINGLE project on /projects POST', function(done) {
// //     chai.request(server)
// //       .post('/api/v1/projects')
// //       .send({'name' : 'Group Project', 'description': 'Group work!', 'tags' : ['work, patience'], 'group': true, 'group_members': '["Shanna, Betsy"]'})
// //       .end(function(err, res){
// //         res.should.have.status(200);
// //         res.should.be.json;
// //         res.body.should.be.a('object');
// //         res.body.should.have.property('description');
// //         res.body.should.have.property('tags');
// //         res.body.should.have.property('group');
// //         res.body.should.have.property('group_members');
// //         res.body.name.should.equal('Group Project');
// //         res.body.description.should.equal('Group work!');
// //         res.body.group.should.equal(true);
// //         res.body.tags[0].should.equal("work, patience");
// //         done();
// //       });
// //   });

// //   it('should update a SINGLE project on /project/<id> PUT', function(done) {
// //     chai.request(server)
// //       .get('/api/v1/projects')
// //       .end(function(err, res){
// //         chai.request(server)
// //           .put('/api/v1/project/'+res.body[0]._id)
// //           .send({'name' : 'Hard Practice', 'description': 'For testing', 'tags' : ['work, patience'], 'group': false, 'group_members': '["Shanna, Betsy"]'})
// //           .end(function(error, res){
// //             res.should.have.status(200);
// //             res.should.be.json;
// //             res.body.should.be.a('object');
// //             res.body.should.have.property('tags');
// //             res.body.should.have.property('group');
// //             res.body.should.have.property('group_members');
// //             res.body.name.should.equal('Hard Practice');
// //             res.body.description.should.equal('For testing');
// //             res.body.group.should.equal(false);
// //             done();
// //         });
// //       });
// //   });

// //   it('should delete a SINGLE project on /project/<id> DELETE', function(done) {
// //     chai.request(server)
// //       .get('/api/v1/projects')
// //       .end(function(err, res){
// //         chai.request(server)
// //           .delete('/api/v1/project/'+res.body[0]._id)
// //           .end(function(error, response){
// //             response.should.have.status(200);
// //             response.should.be.json;
// //             response.body.should.be.a('object');
// //             response.body.should.be.a('object');
// //             response.body.should.have.property('name');
// //             response.body.should.have.property('_id');
// //             response.body.name.should.equal('Test Project');
// //             done();
// //         });
// //       });
// //   });

// // });
