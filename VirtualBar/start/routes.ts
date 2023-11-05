import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'
import User from '../app/Models/User'
import UsersController from '../app/Controllers/Http/UsersController';
import { Router } from '@adonisjs/core/build/standalone';
import View from '@ioc:Adonis/Core/View';
Route.group(()=>{
  Route.get('/', 'UsersController.create').as('create')//chamar page cadastro
  // Route.post('/', 'UsersController.store').as('user.store')//cria um user
  // Route.delete('/:id', 'UsersController.destroy').as('user.destroy')//deleta um user
}).prefix('/users').as('user')

Route.group(()=>{
  Route.post('/','ClientesController.store').as('store')
  Route.get('/new', 'ClientesController.createCadastro').as('createCadastro')
  Route.get('/home','ClientesController.createHome').as('createHome')
}).prefix('/clientes').as('cliente')
Route.group(()=>{
  Route.post('/','EstabelecimentosController.store').as('store')
  Route.get('/new', 'EstabelecimentosController.createCadastro').as('createCadastro')
  Route.get('/home','estabelecimentosController.createHome' ).as('createHome')
  Route.get('/:id/profile','EstabelecimentosController.createProfile').as('profile')
  Route.get('/:id','EstabelecimentosController.show').as('show')

}).prefix('/estabelecimentos').as('estabelecimento')
Route.group(()=>{
  Route.post('/', 'AssociacaosController.store').as('store')
  Route.delete('/:id', 'AssociacaosController.destroy').as('destroy')
}).prefix('/associacoes').as('associacao')
Route.get('/login', 'SessionsController.create').as('session.create')
Route.post('/login', 'SessionsController.store').as('session.store')
Route.get('/logout', 'SessionsController.delete').as('session.delete')



Route.get('/', async ({ response }) => {
  response.redirect().toRoute('session.create')
})
