const db = require('../');

const Location = db.Model.extend({
  tableName: 'locations'
});

module.exports = db.model('Location', Location);
