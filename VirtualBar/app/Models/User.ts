import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public user_id: string 
  @column()
  public first_name:string;
  @column()
  public image_profile:string
  @column()
  public last_name:string;
  @column({})
  public email:string;
  @column()
  public password:string;
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
