const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  locations_users: function() {
    return this.hasMany('LocationUser');
  }
});

module.exports = db.model('User', User);
