// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'as78fg8wu',
      database: 'icoindb'
    },
    migrationos: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  },
};
