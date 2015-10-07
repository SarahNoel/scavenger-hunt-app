var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/scavenger-hunt',
  test: 'mongodb://localhost/scavenger-hunt-test',
  production: 'mongodb://heroku_bt28mvcx:crdg041hs42dj6sbbbevrlb1g6@ds033143.mongolab.com:33143/heroku_bt28mvcx'
};

module.exports = config;
