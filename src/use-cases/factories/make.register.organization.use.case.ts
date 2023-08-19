import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma.organizations.repository'
import { RegisterOrganizationUseCase } from '../register.organization.use.case'

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    organizationsRepository,
  )
  return registerOrganizationUseCase
}
