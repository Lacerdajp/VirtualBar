import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserClient extends User {
  @column({ isPrimary: true })
  public id_user: number
  @column()
  public primeiro_nome: string
  @column()
  public sobrenome: string
  @column()
  public cpf:string
  @column()
  public img_Logo:string

}
