/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
   return knex.schema.createTable('coins', table => {
      table.string('id').primary()
      table.string('current_owner').unsigned()
      table.foreign('current_owner').references('users.id').onDelete("CASCADE")
      table.timestamps(true, true)
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.dropTable('coins')
};
