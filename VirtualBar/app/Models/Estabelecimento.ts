import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Cliente from './Cliente';

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
  @column()
  public clienteId:number
  @hasMany(()=>Cliente)
  public clientes:HasMany<typeof Cliente>

}
