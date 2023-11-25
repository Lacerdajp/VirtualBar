import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from '../../Models/Cliente';
import User from '../../Models/User';
import UsersController from './UsersController';
import UsersServices from '../../Services/UsersServices';
import ClienteServices from 'App/Services/ClienteServices';
import EstabelecimentosServices from '../../Services/EstabelecimentosServices';
import PostsServices from '../../Services/PostsServices';
import ClienteCreateValidator from 'App/Validators/ClienteCreateValidator';

export default class ClientesController {
  public async createCadastro({ view }: HttpContextContract) {
    return view.render('Cadastro/Cliente')
  }
  public async createHome({ view, auth }: HttpContextContract) {
    await auth.check()
    const userEmail = auth.user?.email;
    const id = auth.user?.id;
    const user = await new ClienteServices().recuperarInfos(userEmail, id)
    const estabelecimentos = await new EstabelecimentosServices().showAll()

    const posts = await new PostsServices().index()
    return await view.render('Home/Feed/HomeCliente', { user, estabelecimentos, posts })


  }
  public async store({ request, response, session }: HttpContextContract) {
    //const data = request.only(['primeiro_nome', 'sobrenome', 'email', 'password', 'genero', 'data_nascimento', 'img']);
    const data = await request.validate(ClienteCreateValidator)
    try {
      const userServices = new UsersServices()
      const usuario = await userServices.create(data.email, data.password, false)
      const cliente = await Cliente.create({
        id: usuario.id,
        primeiro_nome: data.primeiro_nome,
        sobrenome: data.sobrenome,
        data_nascimento: data.data_nascimento,
        genero: data.genero,
        img: data.img
      })
      await cliente.related('usuario').associate(usuario)
      await usuario.related('cliente').create(cliente)
      return response.redirect().toRoute('session.create')
    }
    catch {
      session.flashOnly(['nome', 'sobrenome', 'email', 'password', 'genero', 'data_nascimento', 'img'])
      session.flash({ errors: { login: 'Não foi possivel criar User' } })
      return response.redirect().toRoute('cliente.createCadastro')
    }
  }

}
