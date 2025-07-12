/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('todos', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.date('due_date');
    table.boolean('is_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todos');
};
