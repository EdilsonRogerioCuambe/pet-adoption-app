import { z } from 'zod'
import { makeUpdateOrganizationUseCase } from '@/use-cases/factories/make.update.organization.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function updateOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const params = z.object({
    id: z.string(),
  })

  const body = z.object({
    name: z.string().optional(),
    whatsapp: z.string().optional(),
    adress: z.string().optional(),
    photo: z.string().optional(),
  })

  try {
    const { id } = params.parse(request.params)
    const { name, whatsapp, adress, photo } = body.parse(request.body)

    const updateOrganizationUseCase = makeUpdateOrganizationUseCase()

    await updateOrganizationUseCase.execute({
      id,
      name,
      whatsapp,
      adress,
      photo,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
