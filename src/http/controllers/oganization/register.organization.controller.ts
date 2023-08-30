import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make.register.organization.use.case'

export async function registerOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationSchema = z.object({
    name: z.string(),
    adress: z.string(),
    whatsapp: z.string(),
    photo: z.string().optional(),
  })

  const { name, adress, whatsapp, photo } = registerOrganizationSchema.parse(
    request.body,
  )

  const whatsappAdress = `https://api.whatsapp.com/send?phone=${whatsapp}`

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    const org = await registerOrganizationUseCase.execute({
      name,
      adress,
      whatsapp: whatsappAdress,
      photo,
    })
    return reply.status(201).send(org)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
