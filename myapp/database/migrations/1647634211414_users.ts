// database/migrations/1620593365657_users.ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50) // New
      table.string('username', 50).unique().notNullable() // New
      table.string('email', 255).unique().notNullable() // New
      table.string('password', 180).notNullable() // New
      table.string('image_url', 100) // New
      table.string('remember_me_token').nullable() // New
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}