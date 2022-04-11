import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import EstudanteCreateValidator from 'App/Validators/EstudanteCreateValidator'
import UsersController from './UsersController'

export default class EstudantesController {
  public async recoverPassStudent({ view }: HttpContextContract) {
    const tipo = 'estudante'
    return view.render('layouts/recuperarSenha/recoverPassStudent', { tipo })
  }
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    const user = await new UsersController().store(ctx)
    const input = await ctx.request.validate(EstudanteCreateValidator)
    const estudante = await Estudante.create({
      matricula: Number(input.matricula),
      nascimento: input.nascimento.toString(),
      name: input.nome,
    })
    await estudante.related('usuario').associate(user)
    return ctx.response.redirect().toRoute('sessions.login')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
