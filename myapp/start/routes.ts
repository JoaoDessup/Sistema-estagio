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

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/cadastro', async ({ view }) => {
  return view.render('cadastro')
})
Route.post('/cadastro', async ({ view }) => {
  return view.render('vagas');
})

Route.get('/login', async ({ view }) => {
  return view.render('login')
})

Route.get('/vagas', async ({ view }) => {
  return view.render('vagas')
})

Route.get('/chat', async ({ view }) => {
  return view.render('chat')
})

Route.get('/faq', async ({ view }) => {
  return view.render('layouts/faq')
})
