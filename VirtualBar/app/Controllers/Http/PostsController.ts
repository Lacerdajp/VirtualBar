import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AssociacaoServices from '../../Services/AssociacaoServices';
import Post from '../../Models/Post';

export default class PostsController {
  public async store({ request, response,auth }: HttpContextContract){
    const data = request.only(['post','img']);
    await auth.check()
    const id_user=auth.user?.id
    let id_estabelecimento:number|undefined
    if(auth.user?.isEstabelecimento){
      id_estabelecimento=id_user
    }else{
      const assoc=await (new AssociacaoServices()).IsLogged(id_user)
      id_estabelecimento= assoc.estabelecimento.id
    }
    const post= await Post.create(
      {
        id_user:id_user,
        id_estabelecimento:id_estabelecimento,
        post:data.post,
        img:data.img
      }
    )
    try{
      return response.redirect().back()
    }catch(e){
      return response.badRequest('Não Publicamos')
    }

  }

  public async destroy({ request, response }: HttpContextContract) {
    const userId = request.param('id');
    const user = await Post.findOrFail(userId);
    await user.delete();
    response.redirect().back();

  }
}
