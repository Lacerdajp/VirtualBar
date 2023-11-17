import Estabelecimento from '../Models/Estabelecimento';
export default class EstabelecimentosServices {
  constructor() {}

  public async recuperarInfos(email:string|undefined,id:number|undefined){
    if(email==undefined ||id==undefined){
      return null
    }else{
    const estabelecimento= await Estabelecimento.findByOrFail("id",id)
     const user=estabelecimento
     estabelecimento.tipo=JSON.parse(estabelecimento.tipo)
    return user}

  }
  public async show(id:number){
    let estabelecimento = await Estabelecimento.findOrFail(id);
    estabelecimento.tipo=JSON.parse(estabelecimento.tipo)
    return estabelecimento;
  }
  public async showAll(){
    const estabelecimentos=await (await Estabelecimento.query()).map((estabelecimento)=>{
      estabelecimento.tipo=JSON.parse(estabelecimento.tipo)
      return estabelecimento
    })
    // let tipo
    // let estabelecimentos: Array<{id,nome_estabelecimento,cnpj,estrelas,tipo,img}>
    // estabelecimentos=new Array()
    // for (let i = 0; i < all.length; i++) {

    //   const element = {
    //     id:all[i].id,
    //     nome_estabelecimento:all[i].nome_estabelecimento,
    //     cnpj:all[i].cnpj,
    //     estrelas:all[i].estrelas,
    //     tipo:JSON.parse(all[i].tipo),
    //     img:all[i].img

    //   }
    //   estabelecimentos.push(element)
    // }
    return estabelecimentos
}

}
