import { DateTime } from 'luxon'
import Estudante from './Estudante'
import Empresa from './Empresa'
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'

export default class Vaga extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

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
  public empresaId: number

  @belongsTo(() => Empresa)
  public empresa: BelongsTo<typeof Empresa>

  @manyToMany(() => Estudante, {
    pivotTable: 'inscricaos',
  })
  public estudantesInscritos: ManyToMany<typeof Estudante>

  @manyToMany(() => Estudante, {
    pivotTable: 'blacklists',
  })
  public estudantesBloqueados: ManyToMany<typeof Estudante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
