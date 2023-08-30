import { makeGetUserUseCase } from '@/use-cases/factories/make.get.user.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserUseCase()

  const user = await getUserProfile.execute(request.user.sub)

  return reply.status(200).send({
    ...user,
    password: undefined,
  })
}
