import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteOrganizationUseCase } from '@/use-cases/factories/make.delete.organization.use.case'

export async function deleteOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteOrganizationSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteOrganizationSchema.parse(request.params)

  try {
    const deleteOrganizationUseCase = makeDeleteOrganizationUseCase()

    await deleteOrganizationUseCase.execute(id)

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
