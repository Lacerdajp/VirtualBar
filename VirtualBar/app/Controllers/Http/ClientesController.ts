import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from '../../Models/Cliente';
import User from '../../Models/User';
import UsersController from './UsersController';
import UsersServices from '../../Services/UsersServices';
import ClienteServices from 'App/Services/ClienteServices';
import EstabelecimentosServices from '../../Services/EstabelecimentosServices';
import PostsServices from '../../Services/PostsServices';
import ClienteCreateValidator from 'App/Validators/ClienteCreateValidator';
import { formToJSON } from 'axios';
import { DateTime } from 'luxon';
import ClienteUpdateValidator from '../../Validators/ClienteUpdateValidator';

export default class ClientesController {
  public async createCadastro({ view }: HttpContextContract) {
    return view.render('Cadastro/Cliente')
  }
  public async createHome({ view, auth }: HttpContextContract,) {
    await auth.check()
    const userEmail = auth.user?.email;
    const id = auth.user?.id;
    const user = await new ClienteServices().recuperarInfos(userEmail, id)
    const estabelecimentos = await new EstabelecimentosServices().showAll()
    const posts = await new PostsServices().index()
    return await view.render('Home/Feed/HomeCliente', { user, estabelecimentos, posts })


  }
  public async createProfile({ view, auth }: HttpContextContract) {

    await auth.check()
    const user = await new ClienteServices().recuperarInfos(auth.user?.email, auth.user?.id)
    if (user != null) {
      const posts = await new PostsServices().indexPorUsuario(user.id)
      return await view.render('profile/cliente/perfil', { posts, user })
    }
  }
  public async store({ request, response, session }: HttpContextContract) {
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
  public async update({ request, response, auth, params, session }: HttpContextContract) {
    const data = await request.validate(ClienteUpdateValidator);
    try {

      await auth.check()
      const id = params.id
      const cliente = await Cliente.findOrFail(id)
      const usuario = await User.findOrFail(id)
      await usuario.merge({
        email: data.email,
        password: data.password
      })
      await usuario.save()
      await cliente.merge({
        primeiro_nome: data.primeiro_nome,
        sobrenome: data.sobrenome,
        data_nascimento: data.data_nascimento,
        genero: data.genero,
        img: data.img
      })
      await cliente.save()
      return await response.redirect().toRoute('cliente.createHome')
    } catch {
      session.flashOnly(['nome', 'sobrenome', 'genero', 'data_nascimento', 'img'])
      return await response.redirect().toRoute('cliente.createHome')
    }
  }

}
