import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use.case'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send({
      user,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }
}
