import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().unsigned().references('id').inTable('users').onDelete('CASCADE');
      // table.integer('id_usuario').unique().unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('primeiro_nome').notNullable();
      table.string('sobrenome').notNullable();
      table.string('genero').notNullable();
      table.string('img');
      table.timestamp('data_nascimento').notNullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
