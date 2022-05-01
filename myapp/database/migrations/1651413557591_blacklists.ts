import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Blacklists extends BaseSchema {
  protected tableName = 'blacklists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('estudante_id').unsigned().references('estudantes.id')
      table.integer('vaga_id').unsigned().references('vagas.id')
      table.unique(['estudante_id', 'vaga_id'])
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
