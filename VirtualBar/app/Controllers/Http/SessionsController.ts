import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { resetRetrieveHandlers } from 'source-map-support'

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('Cadastro/login')
  }
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('home')
    } catch {
      return response.badRequest('invalid')
    }
  }
}
