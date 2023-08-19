import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetPetsUseCase } from '@/use-cases/factories/make.get.pets.use.case'

export async function getPetsController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPetsUseCase = makeGetPetsUseCase()
    const { pets } = await getPetsUseCase.execute()

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
