import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import Estudante from 'App/Models/Estudante'
import Inscricao from 'App/Models/Inscricao'
import Vaga from 'App/Models/Vaga'

export default class VagasController {
  public async index({ auth, view }: HttpContextContract) {
    if (auth.user?.tipo === 'empresa') {
      const test = await Empresa.query().preload('vagas')
      const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
      const vagas = await empresa.related('vagas').query()
      return view.render('grupo-1/feed', { vagas })
    } else {
      const vagas = await Vaga.all()
      return view.render('grupo-2/feed', { vagas })
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('grupo-1/vaga_create')
  }

  public async list({ view, request, params }: HttpContextContract) {
    const index = params.id
    const vaga = await Vaga.findOrFail(index)
    const inscritos = await vaga.related('estudantesInscritos').query()
    const vec: any = []
    const bloqueados = await vaga.related('estudantesBloqueados').query()
    const inscricoes = await Inscricao.query().where('vaga_id', vaga.id)
    for (const inscrito of inscritos) {
      for (const inscricao of inscricoes)
        if (inscricao.estudante_id === inscrito.id) {
          vec.push([inscricao.pontuacao, inscrito])
        }
    }
    return view.render('grupo-1/inscritos', { inscritos, bloqueados, vaga, index, vec })
  }

  public async associate({ auth, request, response }: HttpContextContract) {
    //ESTUDANTE ENTRA NA VAGA
    const id = request.input('id')
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vagaID = Number(request.input('vaga_id'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesInscritos').attach([estudante.id])
    return response.redirect().toRoute('vagas.show', { id: id })
  }

  public async dissociate({ auth, request, response }: HttpContextContract) {
    //ESTUDANTE SAI DA VAGA
    const id = request.input('id')
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vagaID = Number(request.input('vaga_id'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesInscritos').detach([estudante.id])
    return response.redirect().toRoute('vagas.show', { id: id })
  }

  public async remove({ request, response, params }: HttpContextContract) {
    //EMPRESA REMOVE UM ESTUDANTE DA VAGA
    const id = params.id
    const estudanteID = request.input('estudanteID')
    const estudante = await Estudante.findOrFail(estudanteID)
    const vagaID = Number(request.input('vagaID'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesBloqueados').attach([estudante.id])
    vaga.related('estudantesInscritos').detach([estudante.id])
    return response.redirect().toRoute('vagas.inscritos', { id: id })
  }

  public async replace({ request, response, params }: HttpContextContract) {
    //EMPRESA REMOVE UM ESTUDANTE DA VAGA
    const id = params.id
    const estudanteID = request.input('estudanteID')
    const estudante = await Estudante.findOrFail(estudanteID)
    const vagaID = Number(request.input('vagaID'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesBloqueados').detach([estudante.id])
    vaga.related('estudantesInscritos').attach([estudante.id])
    return response.redirect().toRoute('vagas.inscritos', { id: id })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
    const input = {
      nome: request.input('nome'),
      estado: request.input('estado').toUpperCase(),
      cidade: request.input('cidade'),
      area: request.input('area'),
      tipo: request.input('tipo'),
      salario: request.input('salario'),
      descricao: request.input('descricao'),
    }
    try {
      if (input.tipo === '') {
        throw new Error('TIPO VAZIO')
      }
      const vaga = await empresa.related('vagas').create(input)
      return response.redirect().toRoute('vagas.index')
    } catch {
      response.redirect().toRoute('vagas.create')
    }
  }

  public async show({ auth, view, params }: HttpContextContract) {
    let inscrito = false
    let bloqueado = false
    let vagas: Vaga[]
    let vaga: Vaga
    let index = 1
    let pontuacao: any = null
    const tipo = auth.user?.tipo
    if (auth.user?.tipo === 'empresa') {
      const empresa = await Empresa.findByOrFail('user_id', auth.user?.id)
      vagas = await empresa.related('vagas').query()
      if (params.id <= 0 || params.id > vagas.length) {
        vaga = vagas[0]
        return view.render('grupo-1/vaga', { vaga, index: 1 })
      }
      vaga = vagas[params.id - 1]
    } else {
      const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
      vagas = await Vaga.all()
      vaga = vagas[params.id - 1]
      const estudanteBloqueado = await vaga
        .related('estudantesBloqueados')
        .query()
        .where('estudante_id', estudante.id)
      bloqueado = estudanteBloqueado[0]?.id === estudante.id
      if (!bloqueado) {
        const estudanteInscrito = await vaga
          .related('estudantesInscritos')
          .query()
          .where('estudante_id', estudante.id)
        inscrito = estudanteInscrito[0]?.id === estudante.id
        if (inscrito) {
          const inscricao = await Inscricao.query()
            .where('estudante_id', estudante.id)
            .where('vaga_id', vaga.id)
          pontuacao = inscricao[0].pontuacao
        }
      }
    }
    index = vagas.indexOf(vaga) + 1
    return view.render('vaga', { vaga, index, tipo, inscrito, bloqueado, pontuacao })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const vaga = await Vaga.findOrFail(params.id)
    await vaga.delete()
    return response.redirect().toRoute('vagas.index')
  }
}
