import { GetOrganizationUseCase } from './get.organization.use.case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: GetOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository

describe('Get Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationUseCase(organizationsRepository)
  })

  it('should return an organization', async () => {
    const organization = await organizationsRepository.create({
      name: 'any_name',
      address: 'any_adress',
      whatsapp: 'any_whatsapp',
      email: 'any_email',
      password: 'any_password',
    })

    const { organization: organizationResponse } = await sut.execute(
      organization.id,
    )

    expect(organizationResponse).toEqual(organization)
  })
})
