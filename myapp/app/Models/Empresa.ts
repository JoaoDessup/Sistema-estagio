import { DateTime } from 'luxon'
import User from './User'
import Vaga from './Vaga'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cnpj: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public usuario: BelongsTo<typeof User>

  @hasMany(() => Vaga)
  public vagas: HasMany<typeof Vaga>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
