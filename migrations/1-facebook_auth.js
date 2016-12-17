'use strict';

module.exports.id = "facebook_auth";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('User').update({}, {
    $unset: { "login": 1, "password": 1 }
  }, false, true);

  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};