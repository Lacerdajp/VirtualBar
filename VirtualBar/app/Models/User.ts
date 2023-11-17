import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Estabelecimento from './Estabelecimento';
import Cliente from './Cliente';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public isEstabelecimento:boolean
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
  @column()
  public rememberMeToken: string | null
  @hasOne(() => Cliente,{
    foreignKey:'id'
  })
  public cliente: HasOne<typeof Cliente>;
  @hasOne(() => Estabelecimento,{
    foreignKey:'id'
  })
  public estabelecimento: HasOne<typeof Estabelecimento>;
  @hasMany(()=>Post,{
    foreignKey:'id_user'
  })
  public posts:HasMany<typeof Post>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
