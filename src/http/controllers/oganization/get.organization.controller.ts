import { z } from 'zod'
import { makeGetOrganizationUseCase } from '@/use-cases/factories/make.get.organization.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const params = z.object({
    id: z.string(),
  })

  try {
    const { id } = params.parse(request.params)

    const getOrganizationUseCase = makeGetOrganizationUseCase()

    const organization = await getOrganizationUseCase.execute(id)

    return reply.status(200).send(organization)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
