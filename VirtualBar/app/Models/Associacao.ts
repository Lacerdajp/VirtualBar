import { DateTime } from 'luxon'
import { BaseModel, column,HasMany,hasOne,HasOne,hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente';
import Estabelecimento from './Estabelecimento';

export default class Associacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public id_cliente:number
  @column()
  public id_estabelecimento:number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
