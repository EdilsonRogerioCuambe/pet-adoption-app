import { Prisma, Organization, Role } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  async findByEmail(email: string): Promise<Organization | null> {
    const org = this.organizations.find((org) => org.email === email)

    return org || null
  }

  private organizations: Organization[] = []

  async findAll(): Promise<Organization[]> {
    const organizations = this.organizations

    return organizations
  }

  async findById(id: string): Promise<Organization | null> {
    const org = this.organizations.find((org) => org.id === id)

    return org || null
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization: Organization = {
      id: data.id as string,
      photo: data.photo || null,
      name: data.name,
      address: data.address,
      whatsapp: data.whatsapp,
      password: data.password,
      email: data.email,
      role: data.role || 'ADMIN',
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
    data: Prisma.OrganizationUncheckedUpdateInput,
  ): Promise<Organization> {
    const updatedOrganization: Organization = {
      ...data,
      id,
      name: data.name as string,
      address: data.address as string,
      whatsapp: data.whatsapp as string,
      photo: data.photo as string | null,
      password: data.password as string,
      email: data.email as string,
      role: data.role as Role,
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
