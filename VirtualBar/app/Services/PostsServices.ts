import Post from '../Models/Post';
import User from '../Models/User';
import Estabelecimento from '../Models/Estabelecimento';
import Cliente from '../Models/Cliente';
import { DateTime } from 'luxon';

export default class PostsServices {
  constructor() { }
  public async index() {
    let posts = await Post.query().preload('usuario', (user) => {
      user.where('isEstabelecimento', 1).preload('estabelecimento')
      user.orWhere('isEstabelecimento', 0).preload('cliente');
    }).preload('estabelecimento', (estabelecimento) => {
      estabelecimento.preload('usuario')
    }).orderBy('created_at', 'desc')
    posts.forEach(post => {
      post.createdAt = post.createdAt.toFormat('dd/MM/yyyy HH:mm a')
      post.updatedAt = post.updatedAt.toFormat('dd/MM/yyyy HH:mm a')
    })
    return posts
  }
  public async indexPorEstabelecimento(id_estabelecimento: number) {
    let posts = await Post.query().where('id_estabelecimento', id_estabelecimento).preload('usuario', (user) => {
      user.where('isEstabelecimento', 1).preload('estabelecimento')
      user.orWhere('isEstabelecimento', 0).preload('cliente');
    }).preload('estabelecimento', (estabelecimento) => {
      estabelecimento.preload('usuario')
    }).orderBy('created_at', 'desc')
    posts.forEach(post => {
      post.createdAt = post.createdAt.toFormat('dd/MM/yyyy HH:mm a')
      post.updatedAt = post.updatedAt.toFormat('dd/MM/yyyy HH:mm a')
    })
    return posts
  }
  public async indexPorUsuario(id_user: number) {
    let posts = await Post.query().where('id_user', id_user).preload('usuario', (user) => {
      user.where('isEstabelecimento', 1).preload('estabelecimento')
      user.orWhere('isEstabelecimento', 0).preload('cliente');
    }).preload('estabelecimento', (estabelecimento) => {
      estabelecimento.preload('usuario')
    }).orderBy('created_at', 'desc')
    posts.forEach(post => {
      post.createdAt = post.createdAt.toFormat('dd/MM/yyyy HH:mm a')
      post.updatedAt = post.updatedAt.toFormat('dd/MM/yyyy HH:mm a')
    })
    return posts
  }
}
