import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
    const existingUser = await prisma.user.findUnique({ where: { id } })

    if (!existingUser) {
      throw new Error(`User with id ${id} not found`)
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      include: { organization: true },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
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

  async findAll() {
    const users = await prisma.user.findMany({
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

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
      include: {
        organization: true,
      },
    })

    return user
  }
}
