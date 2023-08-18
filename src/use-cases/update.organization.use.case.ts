import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization } from '@prisma/client'

interface UpdateOrganizationUseCaseProps {
  id: string
  name: string
  whatsapp: string
  adress: string
}

export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
    name,
    whatsapp,
    adress,
  }: UpdateOrganizationUseCaseProps): Promise<Organization> {
    const organization = await this.organizationsRepository.update(id, {
      id,
      name,
      whatsapp,
      adress,
    })

    return organization
  }
}
