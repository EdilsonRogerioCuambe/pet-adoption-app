import { OrganizationsRepository } from '@/repositories/organizations.repository'

interface RegisterOrganizationUseCaseProps {
  name: string
  adress: string
  whatsapp: string
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, adress, whatsapp }: RegisterOrganizationUseCaseProps) {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByName(name)

    if (organizationAlreadyExists) {
      throw new Error('Organization already exists')
    }

    const organization = await this.organizationsRepository.create({
      name,
      adress,
      whatsapp,
    })

    return organization
  }
}
