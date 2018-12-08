
exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', table => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('email').unique().notNullable()
      table.string('first_name').defaultTo('')
      table.string('last_name').defaultTo('')
      table.string('password_hash').notNullable()
      table.string('confirmation_token')
      table.timestamp('confirmed_at')
      table.timestamp('confirmed_sent_at')
      table.timestamps(true)
    })
}

exports.down = (knex) => {
  return knex.schema
    .dropTable('users')
}
