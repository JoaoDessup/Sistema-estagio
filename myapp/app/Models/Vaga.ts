import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Estudante from './Estudante'

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

  @manyToMany(() => Estudante, {
    pivotTable: 'inscricaos',
  })
  public estudantesInscritos: ManyToMany<typeof Estudante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
