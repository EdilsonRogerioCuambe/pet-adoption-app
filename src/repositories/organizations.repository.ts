import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByName(name: string): Promise<Organization | null>
  update(
    id: string,
    data: Prisma.OrganizationUncheckedUpdateInput,
  ): Promise<Organization>
  delete(id: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findAll(): Promise<Organization[]>
}
