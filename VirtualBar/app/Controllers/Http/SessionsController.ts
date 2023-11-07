import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { resetRetrieveHandlers } from 'source-map-support'
import User from '../../Models/User';
import UsersServices from '../../Services/UsersServices';
import View from '@ioc:Adonis/Core/View';

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('cadastro/login')
  }
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.use('web').attempt(email, password)
      const user= auth.user?.isEstabelecimento
      if(user==true )
        return response.redirect().toRoute('estabelecimento.createHome')
      else{
        return response.redirect().toRoute('cliente.createHome')
      }
    } catch {
      return View.render('cadastro/login',{messages:"Login Invalido"})
    }
  }
  public async delete({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('session.create')
  }

}
