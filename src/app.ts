import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, response) => {
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

  return response.status(201).send()
})
