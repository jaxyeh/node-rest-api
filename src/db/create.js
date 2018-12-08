const config = require('../../config')
config.db.connection.database = null
const knex = require('knex')(config.db)

async function createDatabase () {
  try {
    await knex.raw('CREATE DATABASE "api-dev"')
    await knex.raw('CREATE DATABASE "api-test"')
    await knex.raw('CREATE DATABASE "api-db"')
  } catch (err) {
    console.error(err.message)
  }
  await knex.destroy()
}

createDatabase()
