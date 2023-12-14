
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estabelecimento from 'App/Models/Estabelecimento';
import EstabelecimentosServices from 'App/Services/EstabelecimentosServices';
import UsersServices from 'App/Services/UsersServices';
import Route from '@ioc:Adonis/Core/Route';
import Cliente from '../../Models/Cliente';
import PostsServices from '../../Services/PostsServices';
import ClienteServices from '../../Services/ClienteServices';
import EstabelecimentoCreateValidator from 'App/Validators/EstabelecimentoCreateValidator';
import { validator, schema } from '@ioc:Adonis/Core/Validator';
import EstabelecimentoUpdateValidator from '../../Validators/EstabelecimentoUpdateValidator';
import User from 'App/Models/User';

export default class EstabelecimentosController {
  public async createCadastro({ view }: HttpContextContract) {
    return view.render('cadastro/estabelecimento')
  }
  public async createHome({ view, auth, params }: HttpContextContract) {
    await auth.check()
    const userEmail = auth.user?.email;
    const id = auth.user?.id;
    const user = await new EstabelecimentosServices().recuperarInfos(userEmail, id)
    const posts = await new PostsServices().index()
    return await view.render('Home/Feed/HomeEstabelecimento', { user, posts })


  }
  public async createProfile({ view, auth, params, response }: HttpContextContract) {
    await auth.check()
    let assoc
    const userEmail = auth.user?.email;
    const id = auth.user?.id;
    if (id == params.id) {

    } else if (auth.user?.isEstabelecimento) {

    } else {
      const estabelecimento = await new EstabelecimentosServices().show(params.id)
      if (id != null) {
        const cliente = await Cliente.findOrFail(id)
        cliente.estabelecimentoId == null ? assoc = "Livre" : (
          cliente.estabelecimentoId == estabelecimento.id ? assoc = "Ocupado" : assoc = "Ocupado por outro estabelecimento"
        )
      } else {
        assoc = "Livre"
      }
      const user = await new ClienteServices().recuperarInfos(userEmail, id)
      const posts = await new PostsServices().indexPorEstabelecimento(estabelecimento.id)
      return await view.render('profile/estabelecimento/cliente', { estabelecimentos: estabelecimento, assoc, posts, user })
    }
    // const user=new EstabelecimentosServices().recuperarInfos(userEmail,id)

  }
  public async show({ params }: HttpContextContract) {
    return await new EstabelecimentosServices().show(params.id)

  }
  public async store({ request, response, session }: HttpContextContract) {
    const info = await request.only(['nome_estabelecimento', 'cnpj', 'email', 'password', 'tipo', 'img'])
    if (typeof info.tipo == 'string') {
      info.tipo = [info.tipo]
    }
    const data = await request.validate(
      {
        schema: new EstabelecimentoCreateValidator().schema,
        messages: new EstabelecimentoCreateValidator().messages,
        data: info
      })
    try {
      const userServices = new UsersServices()
      const usuario = await userServices.create(data.email, data.password, true)
      const estabelecimento = await Estabelecimento.create({
        id: usuario.id,
        cnpj: data.cnpj,
        tipo: JSON.stringify(data.tipo),
        nome_estabelecimento: data.nome_estabelecimento,
        img: data.img
      })
      await estabelecimento.related('usuario').associate(usuario)
      usuario.related('estabelecimento').create(estabelecimento)
      return response.redirect().toRoute('session.create')
    }
    catch {
      session.flashOnly(['nome', 'cnpj', 'email', 'password', 'tipo', 'img'])
      session.flash({ errors: { login: 'Não foi possivel criar User' } })
      return response.redirect().toRoute('estabelecimento.create')
    }
  }
  public async update({ request, response, params, session, auth }: HttpContextContract) {
    const info = await request.only(['nome_estabelecimento', 'cnpj', 'tipo', 'img'])
    if (typeof info.tipo == 'string') {
      info.tipo = [info.tipo]
    }
    const data = await request.validate(
      {
        schema: new EstabelecimentoUpdateValidator().schema,
        messages: new EstabelecimentoUpdateValidator().messages,
        data: info
      })
    try {
      await auth.check()
      const id = params.id
      const usuario = await Estabelecimento.findOrFail(id)
      const user = await User.findOrFail(id)
      await user.merge({
        email: data.email,
        password: data.password
      })
      await user.save()
      await usuario.merge({
        cnpj: data.cnpj,
        tipo: JSON.stringify(data.tipo),
        nome_estabelecimento: data.nome_estabelecimento,
        img: data.img
      })
      await usuario.save()
      return response.redirect().toRoute('estabelecimento.createHome')
    }
    catch {
      session.flashOnly(['nome', 'cnpj', 'tipo', 'img'])
      return response.redirect().toRoute('estabelecimento.createHome')
    }
  }
}
