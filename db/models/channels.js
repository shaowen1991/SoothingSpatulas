const db = require('../');

const Channel = db.Model.extend({
  tableName: 'channels'
});

module.exports = db.model('Channel', Channel);