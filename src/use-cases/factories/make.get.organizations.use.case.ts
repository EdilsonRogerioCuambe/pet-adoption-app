import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { GetOrganizationsUseCase } from '../get.organizations.use.case'

export function makeGetOrganizationsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const getOrganizationsUseCase = new GetOrganizationsUseCase(
    organizationsRepository,
  )
  return getOrganizationsUseCase
}
