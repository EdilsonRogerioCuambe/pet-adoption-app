import { makeGetPetUseCase } from '@/use-cases/factories/make.get.pet.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const params = z.object({
    id: z.string(),
  })

  try {
    const getPetUseCase = makeGetPetUseCase()
    const { pet } = await getPetUseCase.execute({
      id: params.parse(request.params).id,
    })

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
