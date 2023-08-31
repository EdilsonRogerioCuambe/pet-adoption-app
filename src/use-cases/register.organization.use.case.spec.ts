import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterOrganizationUseCase } from './register.organization.use.case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { OrganizationAlreadyExistsError } from './err/organization.already.exists'
import { compare } from 'bcryptjs'

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
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      password: 'Organization@123Password',
      role: 'ADMIN',
    })

    await compare('Organization@123Password', organization.password)

    expect(organization).toEqual({
      id: 'any_id',
      photo: null,
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      role: 'ADMIN',
      password: expect.any(String),
    })
  })

  it('should not be able to register a new organization with an already existing name', async () => {
    const organization = await organizationsRepository.create({
      id: 'any_id',
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      password: 'Organization@123Password',
      role: 'ADMIN',
    })

    await compare('Organization@123Password', organization.password)

    try {
      await sut.execute({
        id: 'any_id',
        name: 'Organization Name',
        address: 'Organization Adress',
        whatsapp: 'Organization Whatsapp',
        email: 'Organization@gmail.com',
        password: 'Organization@123Password',
        role: 'ADMIN',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(OrganizationAlreadyExistsError)
    }
  })

  it('should be able to register a new organization with a photo', async () => {
    const organization = await sut.execute({
      id: 'any_id',
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      photo: 'Organization Photo',
      password: 'Organization@123Password',
      email: 'Organization@gmail.com',
      role: 'ADMIN',
    })

    await compare('Organization@123Password', organization.password)

    expect(organization).toEqual({
      id: 'any_id',
      photo: 'Organization Photo',
      name: 'Organization Name',
      address: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      email: 'Organization@gmail.com',
      role: 'ADMIN',
      password: expect.any(String),
    })
  })
})
