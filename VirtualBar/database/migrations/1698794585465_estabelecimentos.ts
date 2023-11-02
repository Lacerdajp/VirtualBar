import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'estabelecimentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('nome_estabelecimento').notNullable().unique;
      table.string('cnpj').notNullable().unique();
      table.json('tipo').defaultTo([]);
      table.string('img');
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
      */

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
