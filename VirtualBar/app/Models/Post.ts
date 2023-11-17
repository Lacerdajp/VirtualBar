import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Estabelecimento from './Estabelecimento'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public id_user:number
  @column ()
  public id_estabelecimento:number
  @column()
  public post:string
  @column()
  public estrelas:number
  @column()
  public img:string
  @belongsTo(() => User,{
    foreignKey:'id_user'
  })
  public usuario: BelongsTo<typeof User>
  @belongsTo(() => Estabelecimento,{
    foreignKey:'id_estabelecimento'
  })
  public estabelecimento: BelongsTo<typeof Estabelecimento>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
