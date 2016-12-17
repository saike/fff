var CONFIG = require('./local.json');

module.exports = {
  host: CONFIG.MONGODB.HOST,
  db: CONFIG.MONGODB.DATABASE_NAME,
  directory: './migrations'
};
