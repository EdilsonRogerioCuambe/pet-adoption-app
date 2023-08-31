import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { AuthenticateOrganizationUseCase } from '@/use-cases/authenticate.organization.use.case'

export async function authenticateOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, // At least one lowercase letter, one uppercase letter, one number and one special character
      ),
  })

  const { email, password } = authenticateOrganizationSchema.parse(request.body)

  try {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
      organizationsRepository,
    )

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id,
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
      .send({
        organization,
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
