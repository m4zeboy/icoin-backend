/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
   return knex.schema.createTable('orders', table => {
      table.string('order_id').primary()
      table.integer('quantity')
      table.string('user_id').unsigned()
      table.foreign('user_id').references("users.id").onDelete("CASCADE")
      table.string('user_name')
      table.timestamps(true, true)
      table.boolean('approved')
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.dropTable('orders')
};
