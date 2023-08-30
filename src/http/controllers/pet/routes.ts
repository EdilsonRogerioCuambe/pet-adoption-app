import cloudinary from 'cloudinary'
import { env } from '@/env'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { registerPetController } from './register.pets.controller'
import { updatePetController } from './update.pets.controller'
import { getPetsController } from './get.pets.controller'
import { getPetController } from './get.pet.controller'
import { deletePetsController } from './delete.pets.controller'

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

export async function petRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { preHandler: upload.array('images'), onRequest: [verifyJWT] },
    registerPetController,
  )

  app.get('/pets', { onRequest: [verifyJWT] }, getPetsController)

  app.get('/pets/:id', { onRequest: [verifyJWT] }, getPetController)

  app.put(
    '/pets/:id',
    { preHandler: upload.array('images'), onRequest: [verifyJWT] },
    updatePetController,
  )

  app.delete('/pets/:id', { onRequest: [verifyJWT] }, deletePetsController)
}
