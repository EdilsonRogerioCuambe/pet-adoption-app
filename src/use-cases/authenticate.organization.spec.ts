import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { AuthenticateOrganizationUseCase } from './authenticate.organization.use.case'
import { InvalidCredentialsError } from './err/invalid.credentials.error'
import { describe, it, expect, beforeEach } from 'vitest'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should throw if organization does not exist', async () => {
    const promise = sut.execute({
      email: 'invalid_email',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw if password does not match', async () => {
    await organizationsRepository.create({
      id: 'any_id',
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'any_organization_email',
      password: await hash('@17Edilson17', 10),
      role: 'ADMIN',
    })

    const promise = sut.execute({
      email: 'any_organization_email',
      password: 'invalid_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
