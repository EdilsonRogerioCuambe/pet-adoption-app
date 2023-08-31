import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { OrganizationAlreadyExistsError } from './err/organization.already.exists'
import { hash } from 'bcryptjs'

interface RegisterOrganizationUseCaseProps {
  id?: string
  name: string
  address: string
  whatsapp: string
  photo?: string
  password: string
  email: string
  role: 'ADMIN' | 'MEMBER'
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
    name,
    address,
    whatsapp,
    photo,
    password,
    email,
    role,
  }: RegisterOrganizationUseCaseProps) {
    const hashedPassword = await hash(password, 10)

    const organizationAlreadyExists =
      await this.organizationsRepository.findByName(name)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      id,
      name,
      address,
      whatsapp,
      photo,
      password: hashedPassword,
      email,
      role,
    })

    return organization
  }
}
