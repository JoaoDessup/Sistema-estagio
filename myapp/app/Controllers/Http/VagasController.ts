import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import Estudante from 'App/Models/Estudante'
import Vaga from 'App/Models/Vaga'

export default class VagasController {
  public async index({ auth, view }: HttpContextContract) {
    const test = await Empresa.query().preload('vagas')
    const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
    const vagas = await empresa.related('vagas').query()
    return view.render('grupo-1/feed', { vagas })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('grupo-1/vaga_create')
  }

  public async assign({ auth, request }: HttpContextContract) {
    //COLOCA UM ESTUDANTE NA VAGA
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vagaID = request.input('vaga_id')
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesInscritos').attach([estudante.id])
    return { id: vagaID, inscrito: true }
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
      const vaga = await empresa.related('vagas').create({
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
      response.redirect().toRoute('vagas.create')
    }
  }

  public async show({ auth, view, params }: HttpContextContract) {
    const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
    const vagas = await empresa.related('vagas').query()
    if (params.id <= 0 || params.id > vagas.length) {
      const vaga = vagas[0]
      return view.render('grupo-1/vaga  ', { vaga, index:1 })
    }
    const vaga = vagas[params.id-1]
    const index = vagas.indexOf(vaga) + 1
    return view.render('grupo-1/vaga', { vaga, index })
  }

  public async edit({}: HttpContextContract) {}

  public async listOne({params, view}: HttpContextContract) {
    const vagas = await Vaga.all()
    const vaga = vagas[params.id - 1]
    return view.render('grupo-2/vaga', {vaga})
  }

  public async listAll({view}: HttpContextContract) {
    const vagas = await Vaga.all()
    return view.render('grupo-2/feed', { vagas })
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const vaga = await Vaga.findOrFail(params.id)
    await vaga.delete()
    return response.redirect().toRoute('vagas.index')
  }
}
