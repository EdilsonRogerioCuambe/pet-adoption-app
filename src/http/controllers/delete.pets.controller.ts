import { DeletePetUseCase } from '@/use-cases/delete.pets.use.case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function deletePetsController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const petsRepository = new PrismaPetsRepository()
    const deletePetUseCase = new DeletePetUseCase(petsRepository)
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
