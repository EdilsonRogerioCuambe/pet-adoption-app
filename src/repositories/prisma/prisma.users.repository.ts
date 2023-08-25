import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    })

    return user
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  }

  async findAll() {
    const users = prisma.user.findMany({
      include: {
        organization: true,
      },
    })

    return users
  }

  async findByEmail(email: string) {
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
