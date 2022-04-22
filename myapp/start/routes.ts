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

// Rotas com apelido para serem referenciadas no codigo(caso o / mude o apelido sempre será o mesmo :) )
// Só usar href= "{{ route('APELIDO') }}"
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/login', 'SessionsController.create').as('sessions.login')
Route.post('/login', 'SessionsController.store').as('sessions.create')
Route.get('/logout', 'SessionsController.destroy')
Route.post('/logout', 'SessionsController.destroy').as('sessions.destroy')
Route.get('index/:tipo', 'SessionsController.index')
  .middleware('auth:web')
  .where('tipo', 'estudante|empresa')
  .as('sessions.index')
Route.get('/esquecisenha', 'SessionsController.forgetPass').as('sessions.forgetPass')

Route.post('/estudante/esquecisenha', 'EstudantesController.recoverPassStudent').as(
  'estudantes.recoverPassStudent'
)

Route.post('/empresa/esquecisenha', 'EmpresasController.recoverPassCompany').as(
  'empresa.recoverPassCompany'
)
Route.post('/recover', 'SessionsController.recover').as('sessions.recover')

Route.get('cadastro/:tipo', 'UsersController.create')
  .where('tipo', 'estudante|empresa')
  .as('users.create')
Route.post('empresa/cadastro', 'EmpresasController.store').as('empresa.store')
Route.post('estudante/cadastro', 'EstudantesController.store').as('estudante.store')

Route.get('/vagas', 'VagasController.index').middleware('auth:web').as('vagas.index')
Route.get(':id/vagas', 'VagasController.show')
  .middleware('auth:web')
  .where('id', /^[0-9]$/)
  .as('vagas.show')

Route.get('/criar_vaga', 'VagasController.create').middleware('auth:web').as('vagas.create')
Route.post('criar_vaga', 'VagasController.store').middleware('auth:web').as('vagas.store')
Route.post('/vagas/destroy/:id', 'VagasController.destroy')
  .middleware('auth:web')
  .where('id', /^[0-9]$/)
  .as('vagas.destroy')

Route.get('/perfil', 'EstudantesController.show')
Route.post('/inscrever', 'VagasController.associate').as('vagas.associate')
Route.post('/desinscrever', 'VagasController.dissociate').as('vagas.dissociate')
Route.get('/vagas/inscritos', 'VagasController.list').as('vagas.inscritos')
