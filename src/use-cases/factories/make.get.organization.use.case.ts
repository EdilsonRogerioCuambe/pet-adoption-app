import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { GetOrganizationUseCase } from '../get.organization.use.case'

export function makeGetOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const getOrganizationUseCase = new GetOrganizationUseCase(
    organizationsRepository,
  )
  return getOrganizationUseCase
}
