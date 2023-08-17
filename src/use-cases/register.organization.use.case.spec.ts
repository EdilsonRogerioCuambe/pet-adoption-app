import { it, describe, expect } from 'vitest'
import { RegisterOrganizationUseCase } from './register.organization.use.case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in.memory.organization.repository'
import { OrganizationAlreadyExistsError } from './err/organization.already.exists'

describe('Register Organization Use Case', () => {
  it('should be able to register a new organization', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      organizationsRepository,
    )

    const organization = await registerOrganizationUseCase.execute({
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })

    expect(organization).toEqual({
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      photo: null,
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })
  })

  it('should not be able to register a new organization with an already existing name', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      organizationsRepository,
    )

    await registerOrganizationUseCase.execute({
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })

    try {
      await registerOrganizationUseCase.execute({
        name: 'Organization Name',
        adress: 'Organization Adress',
        whatsapp: 'Organization Whatsapp',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(OrganizationAlreadyExistsError)
    }
  })

  it('should be able to register a new organization with a photo', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      organizationsRepository,
    )

    const organization = await registerOrganizationUseCase.execute({
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
      photo: 'Organization Photo',
    })

    expect(organization).toEqual({
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      photo: 'Organization Photo',
      name: 'Organization Name',
      adress: 'Organization Adress',
      whatsapp: 'Organization Whatsapp',
    })
  })
})
