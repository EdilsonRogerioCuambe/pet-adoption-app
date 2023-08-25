import fastify from 'fastify'
import { appRoutes } from './http/routes'
import fastifyMultipart from '@fastify/multipart'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid data',
      details: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
