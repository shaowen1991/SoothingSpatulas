const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  locations_users: function() {
    return this.hasMany('LocationUser');
  },
  connections: function() {
    return this.hasMany('Connection');
  }
});

module.exports = db.model('User', User);
