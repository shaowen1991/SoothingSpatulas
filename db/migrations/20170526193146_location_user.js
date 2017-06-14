
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('photo_small', 200).nullable();
      table.string('photo_large', 200).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('locations_users', function(table) {
      table.increments('id').unsigned().primary();
      table.string('comment', 200).nullable();
      table.string('latitude', 100).nullable();
      table.string('longitude', 100).nullable();
      table.string('name', 100).nullable();
      table.integer('rating').nullable();
      table.integer('user_id').references('users.id');
      table.integer('location_id').references('locations.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('locations', function (table) {
      table.increments('id').unsigned().primary();
      table.string('category', 100).nullable();
      table.string('latitude', 100).nullable();
      table.string('longitude', 100).nullable();
      table.string('name', 100).nullable().unique();
      table.string('city', 100).nullable();
      table.string('state', 2).nullable();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations_users'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('users')
  ]);
};