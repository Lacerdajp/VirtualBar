
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estabelecimento from 'App/Models/Estabelecimento';
import EstabelecimentosServices from 'App/Services/EstabelecimentosServices';
import UsersServices from 'App/Services/UsersServices';
import Route from '@ioc:Adonis/Core/Route';

export default class EstabelecimentosController {
  public async createCadastro({ view }: HttpContextContract) {
    return view.render('cadastro/estabelecimento')
  }
  public async createHome({ view,auth,params}: HttpContextContract) {
    await auth.check()
    const userEmail = auth.user?.email;
    const id=auth.user?.id;
    const user=new EstabelecimentosServices().recuperarInfos(userEmail,id)
    return await view.render('Feed/HomeEstabelecimento',user)


  }
  public async createProfile({ view,auth,params,response}: HttpContextContract) {

    await auth.check()
    const userEmail = auth.user?.email;
    const id=auth.user?.id;
    if(id==params.id){

    }else if(auth.user?.isEstabelecimento){

    }else{
      const user=await Route.makeUrl('estabelecimento.show',{id:params.id}))
      console.log(user)
      return await view.render('profile/estabelecimento/cliente',user.toJson())
    }
    // const user=new EstabelecimentosServices().recuperarInfos(userEmail,id)

  }
  public async show({params}: HttpContextContract){
      const estabelecimento  =await Estabelecimento.findOrFail(params.id)
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
