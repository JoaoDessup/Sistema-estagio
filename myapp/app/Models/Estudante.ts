import { DateTime } from 'luxon'
import Vaga from './Vaga'
import User from './User'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

export default class Estudante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public matricula: number

  @column()
  public nascimento: DateTime

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public usuario: BelongsTo<typeof User>

  @manyToMany(() => Vaga, {
    pivotTable: 'inscricaos',
  })
  public vagasEstudante: ManyToMany<typeof Vaga>

  @manyToMany(() => Vaga, {
    pivotTable: 'blacklists',
  })
  public vagasBloqueadas: ManyToMany<typeof Vaga>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
