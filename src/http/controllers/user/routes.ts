import { FastifyInstance } from 'fastify'
import { registerUserController } from './register.user.controller'
import { authenticateController } from './authenticate.controller'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { profile } from './profile.controllers'
import { refresh } from './refresh'
import { updateUserController } from './update.user.controller'
import { getUsersController } from './get.users.controller'
import cloudinary from 'cloudinary'
import { env } from '@/env'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    public_id: (req, file) => file.originalname,
  },
})

const upload = multer({
  storage,
})

export async function userRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)

  app.patch('/refresh/token', refresh)

  app.post(
    '/users',
    { preHandler: upload.single('photo') },
    registerUserController,
  )

  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.get('/users', { onRequest: [verifyJWT] }, getUsersController)

  app.put(
    '/users/:id',
    { preHandler: upload.single('photo'), onRequest: [verifyJWT] },
    updateUserController,
  )
}
