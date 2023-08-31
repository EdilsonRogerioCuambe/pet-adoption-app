import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { GetOrganizationsUseCase } from './get.organizations.use.case'
import { describe, it, expect, beforeEach } from 'vitest'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationsUseCase

describe('Get Organizations Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationsUseCase(organizationsRepository)
  })

  it('should return a list of organizations', async () => {
    const first = await organizationsRepository.create({
      id: 'first',
      name: 'first',
      photo: 'first',
      address: 'first',
      whatsapp: 'first',
      password: 'first',
      email: 'first',
    })

    const second = await organizationsRepository.create({
      id: 'second',
      name: 'second',
      photo: 'second',
      address: 'second',
      whatsapp: 'second',
      password: 'second',
      email: 'second',
    })

    const response = await sut.execute()

    expect(response.organizations).toEqual([first, second])
  })
})
