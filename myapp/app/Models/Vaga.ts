import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vaga extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public estado: string

  @column()
  public cidade: string

  @column()
  public area: string

  @column()
  public tipo: string

  @column()
  public salario: number

  @column()
  public descricao: string

  @column()
  public empresa_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
