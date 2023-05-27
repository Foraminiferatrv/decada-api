import type { Knex } from 'knex'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

export default config
