import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vagas extends BaseSchema {
  protected tableName = 'vagas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('estado').notNullable()
      table.string('cidade').notNullable()
      table.string('area').notNullable()
      table.string('tipo').notNullable()
      table.float('salario').notNullable()
      table.string('descricao').notNullable()
      table.integer('empresas_id').references('empresas.id').notNullable().unique()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
