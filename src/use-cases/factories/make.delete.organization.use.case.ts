import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { DeleteOrganizationUseCase } from '../delete.organization.use.case'

export function makeDeleteOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const deleteOrganizationUseCase = new DeleteOrganizationUseCase(
    organizationsRepository,
  )
  return deleteOrganizationUseCase
}
