import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterCityUseCase } from '@/use-cases/register.city.use.case'
import { PrismaCitiesRepository } from '@/repositories/prisma/prisma.cities.repository'

export async function registerCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCitySchema = z.object({
    name: z.string(),
  })

  const { name } = registerCitySchema.parse(request.body)

  const citiesRepository = new PrismaCitiesRepository()
  const registerCityUseCase = new RegisterCityUseCase(citiesRepository)

  const city = await registerCityUseCase.execute({
    name,
  })

  return reply.status(201).send(city)
}
