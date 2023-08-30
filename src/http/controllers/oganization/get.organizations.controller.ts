import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetOrganizationsUseCase } from '@/use-cases/factories/make.get.organizations.use.case'

export async function getOrganizationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  try {
    const getOrganizationsUseCase = makeGetOrganizationsUseCase()

    const organizations = await getOrganizationsUseCase.execute()

    return reply.status(200).send(organizations)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
