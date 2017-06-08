const db = require('../');

const Connection = db.Model.extend({
  tableName: 'connections',
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = db.model('Connection', Connection);