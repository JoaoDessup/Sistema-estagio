import { DateTime } from 'luxon'
import Vaga from './Vaga'
import User from './User'
import { BaseModel, column, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class Estudante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public matricula: number

  @column()
  public nascimento: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasOne(() => User)
  public usuario: HasOne<typeof User>

  @manyToMany(() => Vaga, {
    pivotTable: 'inscricaos',
  })
  public vagasEstudante: ManyToMany<typeof Vaga>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
