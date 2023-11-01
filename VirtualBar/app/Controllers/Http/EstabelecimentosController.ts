 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estabelecimento from 'App/Models/Estabelecimento';
import UsersServices from 'App/Services/UsersServices';

export default class EstabelecimentosController {
  public async create({ view }: HttpContextContract) {
    return view.render('cadastro/estabelecimento')
  }
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nome_estabelecimento', 'cnpj','email', 'password','tipo','img']);
    const userServices=new UsersServices()
    const usuario =await  userServices.create(data.email,data.password,true)
    const estabelecimento =await Estabelecimento.create({
        id:usuario.id,
        cnpj:data.cnpj,
        tipo:JSON.stringify(data.tipo),
        nome_estabelecimento:data.nome_estabelecimento,
        img:data.img
    })
    try{
      return response.redirect().toRoute('session.create')
    }
    catch{
      return response.badRequest('invalid')
    }
  }

}
