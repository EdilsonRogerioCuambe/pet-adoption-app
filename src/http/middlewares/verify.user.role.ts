import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: `Only ${roleToVerify.toLowerCase()}s can access this resource`,
      })
    }
  }
}
