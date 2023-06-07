/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.string('session_id').unique().primary().notNullable()

    table.uuid('user_id').unsigned()
    table.foreign('user_id').references('users.user_id').onDelete('CASCADE').onUpdate('CASCADE')

    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sessions')
}
