'use strict';

module.exports.id = "facebook_auth_3";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.collection('users').dropIndexes();
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};