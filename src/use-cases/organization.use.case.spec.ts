import { it, describe, expect, beforeEach } from 'vitest'
import { OrganizationUseCase } from './organization.use.case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'

let sut: OrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository

describe('Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new OrganizationUseCase(organizationsRepository)
  })

  it('should be able to get a organization by id', async () => {
    const organization = await organizationsRepository.create({
      id: 'any_id',
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      password: 'Organization@123Password',
      role: 'ADMIN',
    })

    const result = await sut.execute(organization.id)

    expect(result).toEqual(organization)
  })
})
