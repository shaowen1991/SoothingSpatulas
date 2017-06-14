var users = require('../sample_seeds/users');
var locations = require('../sample_seeds/locations');

exports.seed = (knex, Promise) => {
  var allPromises = [];

  users.forEach((user) => {
    allPromises.push(createUser(knex, user));
  });

  locations.forEach(function(location){
    allPromises.push(createLocation(knex, location));
  });

  return Promise.all(allPromises);
};

function createUser(knex, user) {
  return knex.table('users')
    .returning('id')
    .insert({
      first: user.first,
      last: user.last,
      email: user.email,
      photo_small: user.photo_small,
      photo_large: user.photo_large
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};

function createLocation(knex, location) {
  return knex.table('locations')
    .returning('id')
    .insert({
      category: location.category,
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      city: location.city,
      state: location.state
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};