import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EstudantesController {

  public async recoverPassStudent({ view }: HttpContextContract) {
    const tipo = 'estudante'
    return view.render('layouts/recuperarSenha/recoverPassStudent', { tipo })
  }
  
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
