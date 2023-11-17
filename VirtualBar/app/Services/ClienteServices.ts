import Cliente from "App/Models/Cliente"

export default class ClienteServices {
  constructor() {}

  public async recuperarInfos(email:string|undefined,id:number|undefined){
    if(email==undefined ||id==undefined){
      return null
    }else{
    const cliente= await Cliente.findByOrFail("id",id)
    const user=cliente
    return user}

  }

}

