import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Estabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nome_estabelecimento:string
  @column()
  public cnpj:string
  @column()
  public estrelas:number
  @column()
  public tipo:string
  @column()
  public img:string

}
