import Cliente from "App/Models/Cliente"

export default class ClienteServices {
  constructor() {}

  public async recuperarInfos(email:string|undefined,id:number|undefined){
    if(email==undefined ||id==undefined){
      const string="Usuario Não encontrado"
      const user={
        id:string,
        email:string,
        nome:string,
        sobrenome:string,
        dataNascimento:string,
        genero: string,
        img:string
      }
      return user
    }else{
    const cliente= await Cliente.findByOrFail("id",id)
    const user={
      id:cliente.id,
      email:email,
      nome:cliente.primeiro_nome,
      sobrenome:cliente.sobrenome,
      dataNascimento:cliente.data_nascimento,
      genero: cliente.genero,
      img:cliente.img

    }
    return user}

  }

}

