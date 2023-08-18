import { it, describe, expect } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { UpdateOrganizationUseCase } from './update.organization.use.case'

describe('Update organization use case', () => {
  it('should be able to update a organization', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new UpdateOrganizationUseCase(organizationsRepository)

    const organization = await organizationsRepository.create({
      name: 'any_name',
      whatsapp: 'any_whatsapp',
      adress: 'any_adress',
      photo: 'any_photo_url',
    })

    console.log('organization', organization)

    const updatedOrganization = await sut.execute({
      id: organization.id,
      name: 'updated_name',
      whatsapp: 'updated_whatsapp',
      adress: 'updated_adress',
    })

    console.log('updatedOrganization', updatedOrganization)

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
