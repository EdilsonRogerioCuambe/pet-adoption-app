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
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      password: 'Organization@123Password',
      role: 'ADMIN',
      photo: 'Organization Photo',
    })

    const updatedOrganization = await sut.execute({
      id: organization.id,
      name: 'updated_name',
      address: 'updated_adress',
      whatsapp: 'updated_whatsapp',
      email: 'updated_email',
      password: 'updated_password',
      role: 'ADMIN',
      photo: 'updated_photo',
    })

    expect(updatedOrganization).toEqual(
      expect.objectContaining({
        id: organization.id,
        name: 'updated_name',
        whatsapp: 'updated_whatsapp',
        address: 'updated_adress',
        photo: 'updated_photo',
        email: 'updated_email',
        password: 'updated_password',
        role: 'ADMIN',
      }),
    )
  })
})
