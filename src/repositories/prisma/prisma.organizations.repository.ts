import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findAll() {
    const organizations = await prisma.organization.findMany()

    return organizations
  }

  findById(id: string) {
    const organization = prisma.organization.findFirst({
      where: {
        id,
      },
      include: {
        pets: true,
        users: true,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByName(name: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        name,
      },
      include: {
        pets: true,
        users: true,
      },
    })

    return organization
      ? {
          id: organization.id,
          photo: organization.photo,
          name: organization.name,
          adress: organization.adress,
          whatsapp: organization.whatsapp,
        }
      : null
  }

  async update(id: string, data: Prisma.OrganizationUpdateInput) {
    const organization = await prisma.organization.update({
      where: {
        id,
      },
      data,
    })

    return organization
  }

  async delete(id: string) {
    return await prisma.organization.delete({
      where: {
        id,
      },
    })
  }
}
