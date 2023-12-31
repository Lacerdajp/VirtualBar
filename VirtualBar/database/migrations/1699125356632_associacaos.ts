import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'associacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_cliente').unsigned()
      .references('id').inTable('clientes').notNullable().unique().onDelete('CASCADE')
      table.integer('id_estabelecimento') .unsigned()
      .references('id').inTable('estabelecimentos').notNullable().onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
