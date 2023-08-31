import { OrganizationUseCase } from '../organization.use.case'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'

export function makeOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const organizationUseCase = new OrganizationUseCase(organizationsRepository)
  return organizationUseCase
}
