import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { GetPetsByOrganizationUseCase } from '@/use-cases/get.pets.by.organization'

export async function getPetsByOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const organization = request.params
    const petsRepository = new PrismaPetsRepository()
    const getPetsByOrganizationUseCase = new GetPetsByOrganizationUseCase(
      petsRepository,
    )
    const { pets } = await getPetsByOrganizationUseCase.execute(
      organization as string,
    )

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
