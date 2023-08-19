import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeletePetsUseCase } from '@/use-cases/factories/make.delete.pets.use.case'

export async function deletePetsController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const deletePetUseCase = makeDeletePetsUseCase()
    const { pet } = await deletePetUseCase.execute(request.params.id)

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
