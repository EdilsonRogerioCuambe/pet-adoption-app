import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { userRoutes } from './http/controllers/user/routes'
import { organizationRoutes } from './http/controllers/oganization/routes'
import { petRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1h',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(organizationRoutes)
app.register(petRoutes)

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
