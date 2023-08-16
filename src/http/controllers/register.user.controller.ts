import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

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

  const hashedPassword = await hash(password, 10)

  if (!request.file) {
    return reply.status(400).send({
      message: 'No file uploaded',
    })
  }

  const { path: photo } = request.file

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      photo,
    },
  })

  return reply.status(201).send()
}
