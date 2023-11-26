import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Estabelecimento from './Estabelecimento';
import User from './User';

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  // @column()
  // public id_usuario: number
  @column()
  public primeiro_nome: string
  @column()
  public sobrenome: string
  @column.date()
  public data_nascimento: DateTime
  @column()
  public genero: string
  @column()
  public img: string
  @belongsTo(() => User, {
    foreignKey: 'id'
  })
  public usuario: BelongsTo<typeof User>
  @column()
  public estabelecimentoId: number
  @hasOne(() => Estabelecimento)
  public estabelecimento: HasOne<typeof Estabelecimento>
}
