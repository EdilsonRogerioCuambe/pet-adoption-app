import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { UpdateOrganizationUseCase } from '../update.organization.use.case'

export function makeUpdateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const updateOrganizationUseCase = new UpdateOrganizationUseCase(
    organizationsRepository,
  )
  return updateOrganizationUseCase
}
