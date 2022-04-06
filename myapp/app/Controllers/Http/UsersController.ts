import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, view, params }: HttpContextContract) {
    console.log(request)
    const input = await request.validate(UserCreateValidator)
    if (input !== null) {
      console.log(input.email)
      console.log(input.password)
    } else {
      console.log(params.id)
    }
    // const usuario = await User.create({
    //   tipo: params.tipo,
    //   email: input.email,
    //   password: input.password,
    // })
    // console.log(usuario)
    return view.render('grupo-1/tela1')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
