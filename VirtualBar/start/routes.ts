import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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
import User from '../app/Models/User';
Route.get('/cadastro', 'UsersController.create').as('user.create')
Route.post('/cadastro', 'UsersCotroller.store').as('user.store')
Route.get('/login', 'SessionsController.create').as('session.create')
Route.post('/login', 'SessionsController.store').as('session.store')

Route.get('/Home', async ({ response }) => {
  return response.json({ value: 'oii' })
}).as('home')
Route.get('/', async ({ response }) => {
  response.redirect().toRoute('session.create')
})
