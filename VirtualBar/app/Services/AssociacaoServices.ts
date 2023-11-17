
import Cliente from '../Models/Cliente';
import Estabelecimento from '../Models/Estabelecimento';

export default class AssociacaoServices {
    constructor() {}
    public async VerificarCliente(id_cli:number, id_estabelecimento:number){
        const cliente=await Cliente.findByOrFail('id',id_cli)
        await cliente.load('estabelecimento')
        const estabelecimento=cliente.estabelecimento
        let text:string
        if(cliente.estabelecimentoId==null){
          text="Livre"
      }else if(cliente.estabelecimentoId==id_estabelecimento){
        text="Ocupado"
      }else{
        text="Outro Estabelecimento"
      }
      const value={
        "text":text,
        "estabelecimento":estabelecimento,
        "cliente":cliente
      }
      return value
    }

    public async IsLogged(id_cli:number|undefined){
      const cliente=await Cliente.findByOrFail('id',id_cli)
      await cliente.load('estabelecimento')
      const estabelecimento=cliente.estabelecimento
      let text:string
      if(cliente.estabelecimentoId==null){
        text="Livre"
    }else{
      text="Ocupado"
    }
    const value={
      "text":text,
      "estabelecimento":estabelecimento,
      "cliente":cliente
    }
    return value
  }

}
