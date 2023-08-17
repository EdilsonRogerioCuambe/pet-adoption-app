import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { GetPetsUseCase } from '@/use-cases/get.pets.use.case'

export async function getPetsController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const petsRepository = new PrismaPetsRepository()
    const getPetsUseCase = new GetPetsUseCase(petsRepository)
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
