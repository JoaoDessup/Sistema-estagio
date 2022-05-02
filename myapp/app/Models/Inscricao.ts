import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Inscricao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vaga_id: number

  @column()
  public estudante_id: number

  @column()
  public pontuacao: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
