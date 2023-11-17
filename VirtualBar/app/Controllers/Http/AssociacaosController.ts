import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from '../../Models/Cliente';
import Estabelecimento from '../../Models/Estabelecimento';
import User from '../../Models/User';

export default class AssociacaosController {
  public async store({ request, response, auth }: HttpContextContract) {
    const user = request.input('id')
    await auth.check()
    const cliente = await Cliente.findOrFail(auth.user?.id)
    const estabelecimento = await Estabelecimento.findOrFail(user)
    cliente.related('estabelecimento').create(estabelecimento)
    estabelecimento.related('clientes').create(cliente)

   return response.redirect().back()

  }
  public async destroy({ params, response, auth }: HttpContextContract) {

    const id_cli = params.id
    const cliente = await Cliente.findOrFail(id_cli)
    const estabelecimento = await Estabelecimento.findOrFail(cliente.estabelecimentoId)

    await estabelecimento.related('clientes').query().where('estabelecimento_id',estabelecimento.id).update({estabelecimentoId:null})
    await cliente.related('estabelecimento').query().where('cliente_id',cliente.id).update({clienteId:null})

    try {
     return response.redirect().back()
    } catch (error) {
      // Trate exceções de maneira mais específica para entender o motivo do erro
      return response.badRequest('Erro')
    }
  }
  public async index({ response,params, auth }: HttpContextContract) {
    const user = params.id
    const estabelecimento = await Estabelecimento.findByOrFail('id', user)
    await estabelecimento.load('clientes')
    return estabelecimento.clientes

  }
}
