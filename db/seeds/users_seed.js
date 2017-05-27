const models = require('../models');

exports.seed = function (knex, Promise) {


return models.User.where({ email: 'admin@domain.com' }).fetch()
    .then((user) => {
      if (user) {
        throw user;
      }
      return models.User.forge({
        first: 'System',
        last: 'Admin',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create user');
      throw err;
    })
    .then((user) => {
      return models.LocationUser.forge({
        comment: 'great place!',
        date: '1495851320', // unix timestamp
        latitude: '37.7749',
        longitude: '-122.4194',
        rating: 10,
        user_id: user.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create location for user');
    })
    .then((locationuser) => {
      return models.Location.forge({
        category: 'bar',
        latitude: locationuser.get('latitude'),
        longitude: locationuser.get('longitude'),
        name: '21st Amendment Brewery'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create a location');
    })
    .catch(() => {
      console.log('WARNING: default user already exists.');
    });
/*
  return models.Profile.where({ email: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'System',
        last: 'Admin',
        display: 'Administrator',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: default user already exists.');
    });
*/
};
