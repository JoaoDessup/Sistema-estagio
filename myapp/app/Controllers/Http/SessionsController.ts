import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async welcome({ view }: HttpContextContract) {
    return view.render('welcome')
  }

  public async forgetPass({ view }: HttpContextContract) {
    return view.render('layouts/recuperarSenha/forgetPass')
  }

  public async recover({ view }: HttpContextContract) {
    return view.render('layouts/recuperarSenha/telaResposta')
  }

  public async login({ view }: HttpContextContract) {
    return view.render('login')
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
