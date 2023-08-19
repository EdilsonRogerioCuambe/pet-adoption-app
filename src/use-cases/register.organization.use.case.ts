import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { OrganizationAlreadyExistsError } from './err/organization.already.exists'

interface RegisterOrganizationUseCaseProps {
  id?: string
  name: string
  adress: string
  whatsapp: string
  photo?: string
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
    name,
    adress,
    whatsapp,
    photo,
  }: RegisterOrganizationUseCaseProps) {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByName(name)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      id,
      name,
      adress,
      whatsapp,
      photo,
    })

    return organization
  }
}
