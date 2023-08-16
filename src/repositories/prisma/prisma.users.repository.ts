import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<{
    id: string
    photo: string | null
    name: string
    email: string
    password: string
    organizationId: string | null
  } | null> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return userAlreadyExists
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
