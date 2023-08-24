import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetsUseCase } from '@/use-cases/factories/make.register.pets.use.case'

interface MultipartFile {
  path: string
}

export async function registerPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetSchema = z.object({
    name: z.string(),
    age: z.string(),
    breed: z.string(),
    size: z.string(),
    description: z.string(),
    organizationId: z.string(),
    userId: z.string(),
  })

  const images: string[] = []

  const { name, age, breed, size, description, organizationId, userId } =
    registerPetSchema.parse(request.body)

  for (const file of request.files as unknown as MultipartFile[]) {
    images.push(file.path)
  }

  try {
    const registerPetUseCase = makeRegisterPetsUseCase()

    await registerPetUseCase.execute({
      name,
      age,
      breed,
      size,
      description,
      images,
      organizationId,
      userId,
    })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
