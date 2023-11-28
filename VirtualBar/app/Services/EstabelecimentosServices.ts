import Estabelecimento from '../Models/Estabelecimento';
export default class EstabelecimentosServices {
  constructor() { }

  public async recuperarInfos(email: string | undefined, id: number | undefined) {
    if (email == undefined || id == undefined) {
      return null
    } else {
      const estabelecimento = await Estabelecimento.query().where("id", id).preload("clientes").preload("usuario").firstOrFail()
      const user = estabelecimento
      estabelecimento.tipo = JSON.parse(estabelecimento.tipo)
      return user
    }

  }
  public async show(id: number) {
    let estabelecimento = await Estabelecimento.findOrFail(id);
    estabelecimento.tipo = JSON.parse(estabelecimento.tipo)
    return estabelecimento;
  }
  public async showAll() {
    const estabelecimentos = await (await Estabelecimento.query()).map((estabelecimento) => {
      estabelecimento.tipo = JSON.parse(estabelecimento.tipo)
      return estabelecimento
    })

    return estabelecimentos
  }

}
