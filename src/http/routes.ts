import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { registerUserController } from './controllers/register.user.controller'
import cloudinary from 'cloudinary'
import { env } from '@/env'

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

export async function appRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    { preHandler: upload.single('photo') },
    registerUserController,
  )
}
