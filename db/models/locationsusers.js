const db = require('../');

const LocationUser = db.Model.extend({
  tableName: 'locations_users',
  users: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('LocationUser', LocationUser);
