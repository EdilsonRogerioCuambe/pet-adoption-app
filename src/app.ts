import fastify from 'fastify'
import { appRoutes } from './http/routes'
import fastifyMultipart from '@fastify/multipart'

export const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

app.register(appRoutes)
