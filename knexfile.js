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
      password: '1234',
      database: 'icoindb'
    },
    migrationos: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  },
};
