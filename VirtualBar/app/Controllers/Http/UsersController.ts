import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route';
import UsersServices from '../../Services/UsersServices';

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('Cadastro/Cadastro')
  }
  // public async store({ request, response }: HttpContextContract){
  //   const email = request.input('email')
  //   const password = request.input('password')
  //   const userServices= new UsersServices()
  //   const user=await userServices.create(email,password,false)
  //   try{
  //     return response.redirect().toRoute('session.create')
  //   }
  //   catch{
  //     return response.badRequest('invalid')
  //   }
  // }
  // public async destroy({ params }: HttpContextContract) {
  //   const val = await User.findOrFail(params.id)
  //   val.delete()
  //   return {
  //     message: 'DELETE',
  //   }
  // }

  public async destroy({ request, response }: HttpContextContract) {
    const userId = request.param('id');
    const user = await User.findOrFail(userId);
    await user.delete();
    response.redirect().toRoute('/logout');

  }
}
