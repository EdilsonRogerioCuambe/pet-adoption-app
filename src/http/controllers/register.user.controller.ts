import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register.user.use.case'
import { PrismaUsersRepository } from '@/repositories/prisma.users.repository'

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
  })

  const { name, email, password } = registerUserSchema.parse(request.body)

  const { path: photo } = request.file as unknown as MultipartFile

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      photo,
    })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send()
  }
}
