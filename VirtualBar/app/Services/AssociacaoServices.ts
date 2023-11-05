import Associacao from '../Models/Associacao';

export default class AssociacaoServices {
    constructor() {}
    public async VerificarCliente(id_cli:number, id_estabelecimento:number){
        const assoc=await Associacao.findBy('id_cliente',id_cli)
        let text:string
        if(assoc==null){
          text="Livre"
      }else if(assoc.id_estabelecimento==id_estabelecimento){
        text="Ocupado"
      }else{
        text="Outro Estabelecimento"
      }
      const value={
        "text":text,
        "associacao":assoc
      }
      return value
    }

}
