import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_user').unsigned()
      .references('id').inTable('users').notNullable().onDelete('CASCADE')
      table.integer('id_estabelecimento')
      .references('id').inTable('estabelecimentos').onDelete('CASCADE')
      table.string('post')
      table.integer('estrelas')
      table.string('img')
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
