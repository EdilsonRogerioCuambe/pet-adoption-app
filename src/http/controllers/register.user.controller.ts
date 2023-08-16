import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register.user.use.case'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { UserAlreadyExistsError } from '@/use-cases/err/user.already.exists'

interface MultipartFile {
  path: string
}

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/),
    organizationId: z.string().optional(),
  })

  const { name, email, password, organizationId } = registerUserSchema.parse(
    request.body,
  )

  const normalizedOrganizationId = organizationId || ''

  const { path: photo } = request.file as unknown as MultipartFile

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      photo,
      organizationId: normalizedOrganizationId,
    })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
