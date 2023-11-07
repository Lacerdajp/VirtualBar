import Post from '../Models/Post';
import User from '../Models/User';
import Estabelecimento from '../Models/Estabelecimento';
import Cliente from '../Models/Cliente';

export default class PostsServices {
  constructor() {}
  public async index(){
    let posts:{usuario,estabelecimento,text,img}[]
    const page = await Post.query().paginate(1, 10)
    posts=new Array()
        for (let i = 0; i < page.length; i++){
       const user= await User.findOrFail(page[i].id_user)
       let nameUser:string|undefined;
       if(user.isEstabelecimento){
          nameUser= (await Estabelecimento.find(page[i].id_estabelecimento))?.nome_estabelecimento
       }else{
          nameUser= (await Cliente.find(page[i].id_user))?.primeiro_nome
       }
        const value={
          usuario: nameUser,
          estabelecimento:(await Estabelecimento.find(page[i].id_estabelecimento))?.nome_estabelecimento,
          text:page[i].post,
          img:page[i].img
        }

       posts.push(value)
    }
    return posts
  }
}
