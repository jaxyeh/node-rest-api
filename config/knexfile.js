const path = require('path')
require('dotenv').config({ silent: true, path: path.join(__dirname, '..', '.env') })

const {
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  DATABASE_URL
} = process.env

const standardOptions = {
  client: 'pg',
  connection: {
    host: PGHOST || 'localhost',
    port: PGPORT || 5432,
    user: PGUSER || 'postgres',
    password: PGPASSWORD || undefined,
    database: PGDATABASE || 'api-dev'
  },
  migrations: {
    directory: path.join(__dirname, '../src/db/migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(__dirname, '../src/db/seeds')
  }
}

if (DATABASE_URL) {
  standardOptions.connection = DATABASE_URL
}

module.exports = {
  development: Object.assign({}, standardOptions, {
    debug: true
  }),

  test: Object.assign({}, standardOptions, {
    connection: {
      database: 'api-test'
    }
  }),

  production: Object.assign({}, standardOptions, {
    connection: {
      database: 'api-db'
    },
    ssl: true,
    seeds: {
      directory: path.join(__dirname, '../src/db/seeds/prod')
    },
    pool: {
      min: 2,
      max: 10
    }
  })
}
