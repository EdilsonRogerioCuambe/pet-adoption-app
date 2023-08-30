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
    password: z
      .string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, // At least one lowercase letter, one uppercase letter, one number and one special character
      ),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }
}
