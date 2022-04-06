import { DateTime } from 'luxon'
import User from './User'
import Vaga from './Vaga'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cnpj: number

  @column()
  public user_id: number

  @hasOne(() => User)
  public usuario: HasOne<typeof User>

  @hasMany(() => Vaga)
  public vagas: HasMany<typeof Vaga>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
