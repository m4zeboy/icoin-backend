/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
   return knex.schema.createTable('transactions', table => {
      table.string('id').primary()
      table.string('sender_id')
      table.string('sender_name')
      table.string('allotee_id')
      table.string('allotee_name')
      table.integer('quantity').notNullable()
      table.timestamps(true, true)
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.dropTable('transactions')
};
