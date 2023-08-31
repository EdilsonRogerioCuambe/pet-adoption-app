import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations.repository'

export class OrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute(id: string): Promise<Organization> {
    const organization = await this.organizationsRepository.findById(id)

    if (!organization) {
      throw new Error('Organization not found')
    }

    return organization
  }
}
