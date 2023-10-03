import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('Cadastro/cadastro')
  }
  public async store({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    await User.create({ email: email, password: password })
    response.status(201)
    response.redirect().toRoute('session.create')
  }
}
