import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/err/user.already.exists'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make.register.user.use.case'

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
    role: z.enum(['ADMIN', 'MEMBER']),
  })

  const { name, email, password, organizationId, role } =
    registerUserSchema.parse(request.body)

  const { path: photo } = request.file as unknown as MultipartFile

  try {
    const registerUseCase = makeRegisterUserUseCase()

    const user = await registerUseCase.execute({
      name,
      email,
      password,
      photo,
      organizationId: organizationId || undefined,
      role,
    })
    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
