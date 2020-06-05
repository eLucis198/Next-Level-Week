import Knex from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary()
    table.integer('pointId').notNullable().references('id').inTable('point')
    table.integer('itemId').notNullable().references('id').inTable('item')
  })
}

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('point_items')
}
