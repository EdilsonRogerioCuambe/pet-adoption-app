import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterOrganizationUseCase } from '@/use-cases/register.organization.use.case'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'

export async function registerOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationSchema = z.object({
    name: z.string(),
    adress: z.string(),
    whatsapp: z.string(),
  })

  const { name, adress, whatsapp } = registerOrganizationSchema.parse(
    request.body,
  )

  const whatsappAdress = `https://api.whatsapp.com/send?phone=${whatsapp}`

  try {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      organizationsRepository,
    )

    await registerOrganizationUseCase.execute({
      name,
      adress,
      whatsapp: whatsappAdress,
    })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
