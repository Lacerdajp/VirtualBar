import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { resetRetrieveHandlers } from 'source-map-support'
import User from '../../Models/User';
import UsersServices from '../../Services/UsersServices';
import View from '@ioc:Adonis/Core/View';
import AuthCreateValidator from '../../Validators/AuthCreateValidator';

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('cadastro/login')
  }
  public async store({ auth, request, response, session }: HttpContextContract) {
    const payload = await request.validate(AuthCreateValidator)
    try {
      await auth.use('web').attempt(payload.email, payload.password)
      const user = auth.user?.isEstabelecimento
      if (user == true)
        return response.redirect().toRoute('estabelecimento.createHome')
      else {
        return response.redirect().toRoute('cliente.createHome')
      }
    } catch {
      session.flashOnly(['email'])
      session.flash({ errors: { login: 'Não encontramos nenhuma conta com essas credenciais.' } })
      return response.redirect().toRoute('session.create')

    }
  }
  public async delete({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('session.create')
  }

}
