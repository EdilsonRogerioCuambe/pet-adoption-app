import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdatePetUseCase } from '@/use-cases/factories/make.update.pet.use.case'

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
    city: z.string().optional(),
    adopted: z.boolean().default(false),
  })

  const images: string[] = []

  const { id, name, age, breed, size, description, city, adopted } =
    updatePetSchema.parse(request.body)

  if (request.files && typeof request.files === 'object') {
    for (const file of request.files as unknown as MultipartFile[]) {
      images.push(file.path)
    }
  }

  try {
    const updatePetUseCase = makeUpdatePetUseCase()

    await updatePetUseCase.execute({
      id,
      name,
      age,
      breed,
      size,
      city,
      description,
      images,
      adopted,
    })
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
