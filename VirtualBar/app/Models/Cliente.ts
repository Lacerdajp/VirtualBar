import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  // @column()
  // public id_usuario: number
  @column()
  public primeiro_nome: string
  @column()
  public sobrenome: string
  @column()
  public data_nascimento:DateTime
  @column()
  public genero:string
  @column()
  public img:string

}
