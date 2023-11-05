 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Associacao from '../../Models/Associacao';
import Cliente from '../../Models/Cliente';
import Estabelecimento from '../../Models/Estabelecimento';
import User from '../../Models/User';

export default class AssociacaosController {
    public async store({ request, response,auth}: HttpContextContract) {
      const user=request.input('id')
      await auth.check()
       try{
      const cliente=await Cliente.findOrFail(auth.user?.id)
      const associate= await Associacao.create({
        id_cliente:auth.user?.id,
        id_estabelecimento:user

      })

      return response.redirect('back')
      } catch (error) {
        // Trate exceções de maneira mais específica para entender o motivo do erro
        return response.redirect('back')
      }
    }
    public async destroy({ params, response,auth}: HttpContextContract){

      const id_cli=params.id
      try{
     const associate=await Associacao.findOrFail(id_cli)
      associate.delete()
     return response.redirect('back')
     } catch (error) {
       // Trate exceções de maneira mais específica para entender o motivo do erro
       return response.badRequest('Erro')
     }
    }
}
