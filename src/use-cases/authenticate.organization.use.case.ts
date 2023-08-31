import { InvalidCredentialsError } from './err/invalid.credentials.error'
import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations.repository'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, organization.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
