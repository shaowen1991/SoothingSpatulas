// ADD ADDITIONAL IMPORTS FOR SAMPLE_SEEDS HERE



var users = require('../sample_seeds/users');
var locations = require('../sample_seeds/locations');
var locationsusers = require('../sample_seeds/locationsusers');
var connections = require('../sample_seeds/connections');
var channels = require('../sample_seeds/channels');

exports.seed = (knex, Promise) => {
  var allPromises = [];

  // ADD ADDITIONAL FOREACH LOOPS HERE



  users.forEach((user) => {
    allPromises.push(createUser(knex, user));
  });

  locations.forEach(function(location){
    allPromises.push(createLocation(knex, location));
  });

  locationsusers.forEach(function(locationuser){
    allPromises.push(createLocationUser(knex, locationuser));
  });

  connections.forEach(function(connection){
    allPromises.push(createConnection(knex, connection));
  });

  channels.forEach(function(channel){
    allPromises.push(createChannel(knex, channel));
  });


  return Promise.all(allPromises);
};



// ADD ADDITIONAL FUNCTIONS HERE



function createUser(knex, user) {
  return knex.table('users')
    .returning('id')
    .insert({
      first: user.first,
      last: user.last,
      email: user.email
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

function createLocationUser(knex, locationuser) {
  return knex.table('locations_users')
    .returning('id')
    .insert({
      comment: locationuser.comment,
      latitude: locationuser.latitude,
      longitude: locationuser.longitude,
      name: locationuser.name,
      rating: locationuser.rating,
      user_id: locationuser.user_id
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};

function createConnection(knex, connection) {
  return knex.table('connections')
    .returning('id')
    .insert({
      users_a_id: connection.users_a_id,
      users_b_id: connection.users_b_id,
      connection_name: connection.connection_name
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};

function createChannel(knex, channel) {
  return knex.table('channels')
    .returning('id')
    .insert({
      from_id: channel.from_id,
      to_id: channel.to_id,
      message: channel.message
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};