import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { DeleteOrganizationUseCase } from './delete.organization.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: DeleteOrganizationUseCase

describe('Delete Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new DeleteOrganizationUseCase(organizationsRepository)
  })

  it('should delete an organization', async () => {
    const organization = await organizationsRepository.create({
      id: 'first',
      name: 'first',
      photo: 'first',
      adress: 'first',
      whatsapp: 'first',
    })

    await sut.execute(organization.id)

    const response = await organizationsRepository.findById(organization.id)

    expect(response).toBe(null)
  })

  it('should throw if organization does not exists', async () => {
    await expect(sut.execute('invalid_id')).rejects.toThrow()
  })
})
