import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations.repository'

interface DeleteOrganizationUseCaseResponse {
  organization: Organization
}

export class DeleteOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(id: string): Promise<DeleteOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(id)

    if (!organization) {
      throw new Error('Organization not found')
    }

    await this.organizationsRepository.delete(id)

    return { organization }
  }
}
