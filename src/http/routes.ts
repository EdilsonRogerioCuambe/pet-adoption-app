import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { registerUserController } from './controllers/register.user.controller'
import cloudinary from 'cloudinary'
import { env } from '@/env'
import { registerPetController } from './controllers/register.pets.controller'
import { registerOrganizationController } from './controllers/register.organization.controller'
import { getPetsController } from './controllers/get.pets.controller'
import { updatePetController } from './controllers/update.pets.controller'
import { deletePetsController } from './controllers/delete.pets.controller'
import { getPetController } from './controllers/get.pet.controller'
import { authenticateController } from './controllers/authenticate.controller'
import { profile } from './controllers/profile.controllers'
import { verifyJWT } from './middlewares/verify.jwt'
import { getUsersController } from './controllers/get.users.controller'
import { updateUserController } from './controllers/update.user.controller'
import { refresh } from './controllers/refresh'

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
  app.post('/sessions', authenticateController)

  app.patch('/refresh/token', refresh)

  app.post(
    '/users',
    { preHandler: upload.single('photo') },
    registerUserController,
  )

  app.post(
    '/pets',
    { preHandler: upload.array('images'), onRequest: [verifyJWT] },
    registerPetController,
  )

  app.post(
    '/organizations',
    { onRequest: [verifyJWT], preHandler: upload.single('photo') },
    registerOrganizationController,
  )

  app.get('/users', { onRequest: [verifyJWT] }, getUsersController)

  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.get('/pets', { onRequest: [verifyJWT] }, getPetsController)

  app.get('/pets/:id', { onRequest: [verifyJWT] }, getPetController)

  app.put(
    '/pets/:id',
    { preHandler: upload.array('images'), onRequest: [verifyJWT] },
    updatePetController,
  )

  app.put(
    '/users/:id',
    { preHandler: upload.single('photo'), onRequest: [verifyJWT] },
    updateUserController,
  )

  app.delete('/pets/:id', { onRequest: [verifyJWT] }, deletePetsController)
}
