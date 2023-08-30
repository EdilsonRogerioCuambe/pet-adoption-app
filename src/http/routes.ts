import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { registerUserController } from './controllers/user/register.user.controller'
import cloudinary from 'cloudinary'
import { env } from '@/env'
import { registerPetController } from './controllers/pet/register.pets.controller'
import { registerOrganizationController } from './controllers/oganization/register.organization.controller'
import { getPetsController } from './controllers/pet/get.pets.controller'
import { updatePetController } from './controllers/pet/update.pets.controller'
import { deletePetsController } from './controllers/pet/delete.pets.controller'
import { getPetController } from './controllers/pet/get.pet.controller'
import { authenticateController } from './controllers/user/authenticate.controller'
import { profile } from './controllers/user/profile.controllers'
import { verifyJWT } from './middlewares/verify.jwt'
import { getUsersController } from './controllers/user/get.users.controller'
import { updateUserController } from './controllers/user/update.user.controller'
import { refresh } from './controllers/user/refresh'
import { verifyUserRole } from './middlewares/verify.user.role'

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
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      preHandler: upload.single('photo'),
    },
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
