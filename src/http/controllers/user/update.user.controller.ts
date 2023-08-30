import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/factories/make.update.user.use.case'

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const updateUserSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    organizationId: z.string().optional(),
    role: z.enum(['ADMIN', 'MEMBER']).optional(),
  })

  const { id, name, email, password, organizationId, role } =
    updateUserSchema.parse(request.body)

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      organizationId,
      role: role || 'MEMBER',
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
