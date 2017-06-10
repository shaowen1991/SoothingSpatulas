const db = require('../');

const Connection = db.Model.extend({
  tableName: 'connections',
  user: function() {
    return this.belongsTo(User);
  },
  channels: function() {
    return this.hasMany(Channel);
  }
});

module.exports = db.model('Connection', Connection);