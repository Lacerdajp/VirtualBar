import Cliente from "App/Models/Cliente"

export default class ClienteServices {
  constructor() {}

  public async recuperarInfos(email:string|undefined,id:number|undefined){
    if(email==undefined ||id==undefined){
      return null
    }else{
    // const cliente= await Cliente.findByOrFail("id",id)
    const cliente= await Cliente.query().where("id",id).preload("usuario").firstOrFail()
    const user=cliente
    return user}

  }

}

