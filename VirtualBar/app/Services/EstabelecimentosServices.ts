import Estabelecimento from '../Models/Estabelecimento';
export default class EstabelecimentosServices {
  constructor() {}

  public async recuperarInfos(email:string|undefined,id:number|undefined){
    if(email==undefined ||id==undefined){
      const string="Usuario Não encontrado"
      const user={
        email:string,
      cnpj:string,
      nome:string,
      tipo:string,
      img:string
      }
      return user
    }else{
    const estabelecimento= await Estabelecimento.findByOrFail("id",id)
     const user={
      email:email,
      cnpj:estabelecimento.cnpj,
      nome:estabelecimento.nome_estabelecimento,
      tipo:estabelecimento.tipo,
      img:estabelecimento.img

    }
    return user}

  }
  public async showAll(){
    const all=await Estabelecimento.query()

    return all
}

}
