import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa'
import Estudante from 'App/Models/Estudante'
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

  public async list({ view, request }: HttpContextContract) {
    const vagaID = request.input('vaga_id')
    const vaga = await Vaga.findOrFail(vagaID)
    const inscritos = await vaga.related('estudantesInscritos').query()
    return view.render('grupo-1/inscritos', { inscritos })
  }

  public async associate({ auth, request, response }: HttpContextContract) {
    //COLOCA UM ESTUDANTE NA VAGA
    const id = request.input('id')
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vagaID = Number(request.input('vaga_id'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesInscritos').attach([estudante.id])
    return response.redirect().toRoute('vagas.show', { id: id })
  }

  public async dissociate({ auth, request, response }: HttpContextContract) {
    //COLOCA UM ESTUDANTE NA VAGA
    const id = request.input('id')
    const estudante = await Estudante.findByOrFail('user_id', auth.user?.id)
    const vagaID = Number(request.input('vaga_id'))
    const vaga = await Vaga.findOrFail(vagaID)
    vaga.related('estudantesInscritos').detach([estudante.id])
    return response.redirect().toRoute('vagas.show', { id: id })
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
    let vagas: Vaga[]
    let vaga: Vaga
    let index = 1
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
      const inscritos = await vaga.related('estudantesInscritos').query()
      for (const i in inscritos) {
        if (inscritos[i].id === estudante.id) {
          inscrito = true
          break
        }
      }
    }
    index = vagas.indexOf(vaga) + 1
    return view.render('vaga', { vaga, index, tipo, inscrito })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const vaga = await Vaga.findOrFail(params.id)
    await vaga.delete()
    return response.redirect().toRoute('vagas.index')
  }
}
