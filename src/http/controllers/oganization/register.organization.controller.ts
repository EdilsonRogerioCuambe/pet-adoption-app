import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make.register.organization.use.case'

export async function registerOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationSchema = z.object({
    name: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    photo: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'MEMBER']),
  })

  const { name, address, whatsapp, photo, role, email, password } =
    registerOrganizationSchema.parse(request.body)

  const whatsappAdress = `https://api.whatsapp.com/send?phone=${whatsapp}`

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    const org = await registerOrganizationUseCase.execute({
      name,
      address,
      whatsapp: whatsappAdress,
      photo,
      role,
      email,
      password,
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
