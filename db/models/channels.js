const db = require('../');

const Channel = db.Model.extend({
  tableName: 'channels',
  connection: function () {
    return this.belongsTo(Connection);
  }
});

module.exports = db.model('Channel', Channel);