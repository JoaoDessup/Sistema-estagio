import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import EmpresaCreateValidator from 'App/Validators/EmpresaCreateValidator'
import UsersController from './UsersController'

export default class EmpresasController {
  public async recoverPassCompany({ view }: HttpContextContract) {
    const tipo = 'empresa'
    return view.render('layouts/recuperarSenha/recoverPassCompany', { tipo })
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    const user = await new UsersController().store(ctx)
    const input = await ctx.request.validate(EmpresaCreateValidator)
    const empresa = await Empresa.create({
      name: input.nome,
      cnpj: Number(input.cnpj),
    })
    await empresa.related('usuario').associate(user)
    return ctx.response.redirect().toRoute('sessions.login')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
