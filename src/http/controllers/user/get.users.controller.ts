import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUsersUseCase } from '@/use-cases/factories/make.get.users.use.case'

export async function getUsersController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUsersUseCase = makeGetUsersUseCase()
    const { users } = await getUsersUseCase.execute()

    return reply.status(200).send({
      users,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }
}
