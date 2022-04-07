import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresasController {

  public async recoverPassCompany({ view }: HttpContextContract) {
    const tipo = 'empresa'
    return view.render('layouts/recuperarSenha/recoverPassCompany', { tipo })
  }
  
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
