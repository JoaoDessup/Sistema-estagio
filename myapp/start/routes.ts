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

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'SessionsController.welcome')

Route.get('/esquecisenha', 'SessionsController.forgetPass')

Route.post('/estudante/esquecisenha', 'SessionsController.recoverPassStudent')

Route.post('/empresa/esquecisenha', 'SessionsController.recoverPassCompany')

Route.get('/recover', 'SessionsController.recover')

Route.get(':tipo/cadastro', async ({ params, view }) => {
  const tipo = params.tipo
  return view.render('cadastro', { tipo })
}).where('tipo', 'estudante|empresa')

Route.post(':tipo/cadastro', 'UsersController.store')
// Route.post('/estudante/cadastro', 'UsersController.store')

// Route.post('/empresa/cadastro', async ({ view }) => {
//   const tipo = 'empresa'
//   return view.render('cadastro', { tipo })
// })

Route.get('/login', async ({ view }) => {
  return view.render('login')
})

Route.get('/teste', async ({ view }) => {
  return view.render('grupo-1/tela1')
})
