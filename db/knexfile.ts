import type { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  dev: {
    client: 'pg',
    connection: {
      database: process.env.DB_ID,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as number | undefined,
      ssl: true,
    },
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'pg',
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
    client: 'pg',
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
