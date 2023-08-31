import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization } from '@prisma/client'

interface UpdateOrganizationUseCaseProps {
  id: string
  name?: string
  whatsapp?: string
  address?: string
  photo?: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
}

export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
    name,
    whatsapp,
    address,
    photo,
    email,
    password,
    role,
  }: UpdateOrganizationUseCaseProps): Promise<Organization> {
    const organization = await this.organizationsRepository.update(id, {
      id,
      name,
      whatsapp,
      address,
      photo,
      email,
      password,
      role,
    })

    return organization
  }
}
