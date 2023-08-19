import { makeGetPetUseCase } from '@/use-cases/factories/make.get.pet.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getPetController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const getPetUseCase = makeGetPetUseCase()
    const { pet } = await getPetUseCase.execute({ id: request.params.id })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
