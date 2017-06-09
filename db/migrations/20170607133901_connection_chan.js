
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('connections', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('users_a_id').references('users.id');
      table.integer('users_b_id').references('users.id');
      table.string('connection_name', 100).notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('channels', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('from_id').references('users.id');
      table.integer('to_id').references('users.id');
      table.string('message', 200).notNullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connections'),
    knex.schema.dropTable('channels')
  ]);
};