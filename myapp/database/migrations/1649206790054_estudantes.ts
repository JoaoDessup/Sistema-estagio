import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Estudantes extends BaseSchema {
  protected tableName = 'estudantes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('matricula').unique().notNullable().unsigned()
      table.dateTime('nascimento').notNullable()
      table.integer('user_id').unsigned().references('users.id').unique().onDelete('CASCADE')
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
