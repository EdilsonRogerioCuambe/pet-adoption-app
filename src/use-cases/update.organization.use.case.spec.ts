import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { UpdateOrganizationUseCase } from './update.organization.use.case'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: UpdateOrganizationUseCase

describe('Update organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new UpdateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to update a organization', async () => {
    const organization = await organizationsRepository.create({
      id: 'any_id',
      name: 'any_name',
      whatsapp: 'any_whatsapp',
      adress: 'any_adress',
      photo: 'any_photo_url',
    })

    const updatedOrganization = await sut.execute({
      id: organization.id,
      name: 'updated_name',
      whatsapp: 'updated_whatsapp',
      adress: 'updated_adress',
    })

    expect(updatedOrganization).toEqual(
      expect.objectContaining({
        id: organization.id,
        name: 'updated_name',
        whatsapp: 'updated_whatsapp',
        adress: 'updated_adress',
      }),
    )
  })
})
