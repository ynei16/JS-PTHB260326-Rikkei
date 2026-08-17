exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name', 100);
    table.string('email', 255).unique();
    table.timestamps(true, true);
  });
};
exports.down = function(knex) { return knex.schema.dropTableIfExists('users'); };