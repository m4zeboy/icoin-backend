/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
   return knex.schema.createTable('users', (table) => {
      table.string('id').primary()
      table.string('name').unique()
      table.string('password')
      table.timestamps(true, true)
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.dropTable('users')
};
