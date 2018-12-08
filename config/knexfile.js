const path = require('path')

const { DATABASE_URL } = process.env

const standardOptions = {
  client: 'pg',
  connection: DATABASE_URL || 'postgresql://localhost:5432/api-dev',
  migrations: {
    directory: path.join(__dirname, '../src/db/migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(__dirname, '../src/db/seeds')
  },
}

module.exports = {
  development: Object.assign({}, standardOptions, {
    debug: true
  }),

  test: Object.assign({}, standardOptions, {
    connection: DATABASE_URL || 'postgresql://localhost:5432/api-test',
    // debug: true
  }),

  production: Object.assign({}, standardOptions, {
    connection: DATABASE_URL,
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
