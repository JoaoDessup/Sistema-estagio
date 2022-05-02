import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estudante from 'App/Models/Estudante'
import Inscricao from 'App/Models/Inscricao'
import Vaga from 'App/Models/Vaga'

export default class QuizzesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    let pontuacao = 0
    const verify = ['B', 'B', 'C', 'B', 'D', 'A', 'A', 'C']
    for (let i = 1; i <= 8; i++) {
      if (verify[i - 1] === request.input(`quest${i}`)?.toUpperCase()) {
        pontuacao++
      }
    }
    const vagaID = request.input('vagaID')
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vaga = await Vaga.findOrFail(vagaID)
    const teste = await Inscricao.query()
      .where('vaga_id', vaga.id)
      .where('estudante_id', estudante.id)
    teste[0].pontuacao = pontuacao
    teste[0].save()
    response.redirect().toRoute('vagas.index')
  }

  public async show({ request, params, view }: HttpContextContract) {
    const id = params.id
    const vagaID = request.input('vagaID')
    return view.render('grupo-2/questionario', { id: id, vagaID })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
