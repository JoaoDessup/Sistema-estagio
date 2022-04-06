import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async welcome({ view }: HttpContextContract) {
    return view.render('welcome')
  }
  public async forgetPass({ view }: HttpContextContract) {
    return view.render('layouts/recuperarSenha/forgetPass')
  }
  public async recoverPassStudent({ view }: HttpContextContract){
    const tipo = 'estudante'
  return view.render('layouts/recuperarSenha/recoverPassStudent', { tipo })
  }
  public async recoverPassCompany({ view }: HttpContextContract){
    const tipo = 'empresa'
  return view.render('layouts/recuperarSenha/recoverPassCompany', { tipo })
  }
  public async recover({ view }: HttpContextContract){
  return view.render('layouts/recuperarSenha/telaResposta')
  }
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
