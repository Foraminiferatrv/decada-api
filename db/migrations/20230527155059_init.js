/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('users', (table) => {
    table.integer('id').unique().primary().notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('username').notNullable()
    table.string('image').defaultTo('')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {}
