import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findAll(): Promise<Organization[]> {
    const organizations = await prisma.organization.findMany()

    return organizations
  }

  findById(id: string): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  } | null> {
    const organization = prisma.organization.findFirst({
      where: {
        id,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  }> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByName(name: string): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  } | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        name,
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

  async update(
    id: string,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  }> {
    const organization = await prisma.organization.update({
      where: {
        id,
      },
      data,
    })

    return organization
  }

  async delete(id: string): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  }> {
    return await prisma.organization.delete({
      where: {
        id,
      },
    })
  }
}
