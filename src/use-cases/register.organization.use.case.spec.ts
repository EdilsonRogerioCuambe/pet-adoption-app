import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterOrganizationUseCase } from './register.organization.use.case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { OrganizationAlreadyExistsError } from './err/organization.already.exists'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const organization = await sut.execute({
      id: 'any_id',
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })

    expect(organization).toEqual({
      id: 'any_id',
      photo: null,
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })
  })

  it('should not be able to register a new organization with an already existing name', async () => {
    await organizationsRepository.create({
      id: 'any_id',
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })

    try {
      await sut.execute({
        id: 'any_id',
        name: 'Organization Name',
        adress: 'Organization Adress',
        whatsapp: 'Organization Whatsapp',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(OrganizationAlreadyExistsError)
    }
  })

  it('should be able to register a new organization with a photo', async () => {
    const organization = await sut.execute({
      id: 'any_id',
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      photo: 'Organization Photo',
    })

    expect(organization).toEqual({
      id: 'any_id',
      photo: 'Organization Photo',
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })
  })
})
