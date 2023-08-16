import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  return reply.status(201).send()
}
