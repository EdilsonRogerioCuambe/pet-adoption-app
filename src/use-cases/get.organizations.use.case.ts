import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization } from '@prisma/client'

interface GetOrganizationsUseCaseResponse {
  organizations: Organization[]
}

export class GetOrganizationsUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(): Promise<GetOrganizationsUseCaseResponse> {
    const organizations = await this.organizationsRepository.findAll()

    return {
      organizations,
    }
  }
}
