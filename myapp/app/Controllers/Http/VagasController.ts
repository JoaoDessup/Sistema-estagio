import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'

export default class VagasController {
  public async index({ auth, view }: HttpContextContract) {
    const test = await Empresa.query().preload('vagas')
    const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
    const vagas = await empresa.related('vagas').query()
    console.log(vagas.length)
    return view.render('grupo-1/feed', { vagas })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('grupo-1/vaga_create')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
    const nome = request.input('nome')
    const estado = request.input('estado')
    const cidade = request.input('cidade')
    const area = request.input('area')
    const tipo = request.input('tipo', 'estagio')
    const salario = request.input('salario')
    const descricao = request.input('descricao')
    try {
      const vaga = empresa.related('vagas').create({
        nome: nome,
        estado: estado,
        cidade: cidade,
        area: area,
        tipo: tipo,
        salario: salario,
        descricao: descricao,
      })
      return response.redirect().toRoute('vagas.index')
    } catch {
      console.log('n sei')
      response.redirect().toRoute('vagas.create')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
