import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private organizations: Organization[] = []

  async findAll(): Promise<Organization[]> {
    const organizations = this.organizations

    return organizations
  }

  async findById(id: string): Promise<Organization | null> {
    const org = this.organizations.find((org) => org.id === id)

    return org || null
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: data.id as string,
      photo: data.photo || null,
      name: data.name,
      adress: data.adress,
      whatsapp: data.whatsapp,
    }

    this.organizations.push(organization)

    return organization
  }

  async findByName(name: string): Promise<Organization | null> {
    const org = this.organizations.find((org) => org.name === name)
    return org || null
  }

  async update(
    id: string,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<Organization> {
    const updatedOrganization: Organization = {
      ...data,
      id,
      name: data.name as string,
      adress: data.adress as string,
      whatsapp: data.whatsapp as string,
      photo: data.photo as string | null,
    }

    this.organizations = this.organizations.map((org) =>
      org.id === id ? updatedOrganization : org,
    )

    return updatedOrganization
  }

  async delete(id: string): Promise<Organization | null> {
    const orgIndex = this.organizations.findIndex((org) => org.id === id)

    if (orgIndex === -1) {
      return null // Return null if organization is not found
    }

    const org = this.organizations[orgIndex]
    this.organizations.splice(orgIndex, 1) // Remove the organization from the array

    return org
  }
}
