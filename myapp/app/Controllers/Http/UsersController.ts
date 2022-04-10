import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import User from 'App/Models/User'

export default class UsersController {
  //   public async cadastro({ params, view  }: HttpContextContract) {
  //     const tipo = params.tipo
  //   return view.render('cadastro', { tipo })
  // }.where('tipo', 'estudante|empresa')

  public async index({}: HttpContextContract) {}

  public async create({ params, view }: HttpContextContract) {
    const tipo = params.tipo
    return view.render('cadastro', { tipo })
  }

  public async store({ request }: HttpContextContract) {
    const input = await request.validate(UserCreateValidator)
    const usuario = await User.create({
      tipo: input.tipo,
      email: input.email,
      password: input.password,
    })
    return usuario
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
