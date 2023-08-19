import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterCitiesUseCase } from '@/use-cases/factories/make.register.cities.use.case'

export async function registerCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCitySchema = z.object({
    name: z.string(),
  })

  const { name } = registerCitySchema.parse(request.body)

  const registerCityUseCase = makeRegisterCitiesUseCase()

  const city = await registerCityUseCase.execute({
    name,
  })

  return reply.status(201).send(city)
}
