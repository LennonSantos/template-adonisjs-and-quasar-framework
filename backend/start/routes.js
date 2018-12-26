'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Bem vindo a minha api.' }
})

Route.post('authenticate', 'AuthController.authenticate')
Route.post('register', 'AuthController.register')

Route.resource('roles', 'RoleController').apiOnly().middleware(['auth'])
Route.resource('permisions', 'PermisionController').apiOnly().middleware(['auth'])

Route.post('teste', () => {
  return {msg: 'ok'}
}).middleware(['auth'])
