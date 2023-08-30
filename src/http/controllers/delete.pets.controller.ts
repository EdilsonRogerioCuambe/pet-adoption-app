import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeletePetsUseCase } from '@/use-cases/factories/make.delete.pets.use.case'
import { z } from 'zod'

export async function deletePetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const deletePetsSchema = z.object({
    id: z.string(),
  })

  const { id } = deletePetsSchema.parse(request.params)

  try {
    const deletePetsUseCase = makeDeletePetsUseCase()

    await deletePetsUseCase.execute(id)

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
