import { FastifyRequest, FastifyReply } from 'fastify'
import { makeOrganizationUseCase } from '@/use-cases/factories/make.organization.use.case'
import { z } from 'zod'

export async function organizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  try {
    const organizationUseCase = makeOrganizationUseCase()

    const organization = await organizationUseCase.execute(id)

    return reply.status(200).send(organization)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
