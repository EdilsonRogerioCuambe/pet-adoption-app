import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../repositories/organizations.repository'

interface GetOrganizationUseCaseResponse {
  organization: Organization
}

export class GetOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(id: string): Promise<GetOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(id)

    if (!organization) {
      throw new Error('Organization not found')
    }

    return { organization }
  }
}
