import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Cliente from './Cliente';
import Post from './Post';
import User from './User';

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
  @belongsTo (()=>User,{
    foreignKey:'id'
  })
  public usuario:BelongsTo<typeof User>
  @hasMany(()=>Post,{
    foreignKey:'id_estabelecimento'
  })
  public posts:HasMany<typeof Post>
}
