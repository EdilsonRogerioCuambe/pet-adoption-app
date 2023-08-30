import cloudinary from 'cloudinary'
import { env } from '@/env'
import multer from 'fastify-multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { registerOrganizationController } from './register.organization.controller'
import { getUsersController } from '../user/get.users.controller'
import { updatePetController } from '../pet/update.pets.controller'
import { deleteOrganizationController } from './delete.organization.controller'
import { getOrganizationController } from './get.organization.controller'

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

export async function organizationRoutes(app: FastifyInstance) {
  app.post(
    '/organizations',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      preHandler: upload.single('photo'),
    },
    registerOrganizationController,
  )

  app.get('/organizations', { onRequest: [verifyJWT] }, getUsersController)

  app.get(
    '/organizations/:id',
    { onRequest: [verifyJWT] },
    getOrganizationController,
  )

  app.put(
    '/organizations/:id',
    {
      preHandler: upload.single('photo'),
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
    },
    updatePetController,
  )

  app.delete(
    '/organizations/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    deleteOrganizationController,
  )
}
