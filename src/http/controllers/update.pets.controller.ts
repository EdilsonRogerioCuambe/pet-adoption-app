import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UpdatePetUseCase } from '@/use-cases/update.pets.use.case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'

interface MultipartFile {
  path: string
}

export async function updatePetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePetSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    age: z.string().optional(),
    breed: z.string().optional(),
    size: z.string().optional(),
    description: z.string().optional(),
  })

  const images: string[] = []

  const { id, name, age, breed, size, description } = updatePetSchema.parse(
    request.body,
  )

  if (request.files && typeof request.files === 'object') {
    for (const file of request.files as unknown as MultipartFile[]) {
      images.push(file.path)
    }
  }

  try {
    const petsRepository = new PrismaPetsRepository()
    const updatePetUseCase = new UpdatePetUseCase(petsRepository)

    await updatePetUseCase.execute({
      id,
      name,
      age,
      breed,
      size,
      description,
      images: images.length > 0 ? [...images] : undefined,
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
