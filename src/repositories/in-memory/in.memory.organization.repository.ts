import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  }> {
    const organization: Organization = {
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      photo: data.photo || null,
      name: data.name,
      adress: data.adress,
      whatsapp: data.whatsapp,
    }

    return organization
  }

  async findByName(name: string): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  } | null> {
    const org = this.organizations.find((org) => org.name === name)

    return org || null
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
    const org = this.organizations.find((org) => org.id === id)

    if (!org) {
      throw new Error('Organization not found')
    }

    const updatedOrg = {
      ...org,
      ...data,
      id: org.id,
    }

    return updatedOrg as Organization
  }

  async delete(id: string): Promise<{
    id: string
    photo: string | null
    name: string
    adress: string
    whatsapp: string
  }> {
    const org = this.organizations.find((org) => org.id === id)

    if (!org) {
      throw new Error('Organization not found')
    }

    this.organizations = this.organizations.filter((org) => org.id !== id)

    return org
  }
}
