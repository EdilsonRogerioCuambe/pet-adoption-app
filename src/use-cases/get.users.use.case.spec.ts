import { it, describe, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { GetUsersUseCase } from './get.users.use.case'

describe('Get users use case', () => {
  it('should be able to get all users', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new GetUsersUseCase(usersRepository)

    const userOne = await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      photo: 'any_photo_url',
      organization: {
        create: {
          name: 'any_organization_name',
          whatsapp: 'any_whatsapp',
          adress: 'any_adress',
        },
      },
    })

    const userTwo = await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      photo: 'any_photo_url',
      organization: {
        create: {
          name: 'any_organization_name',
          whatsapp: 'any_whatsapp',
          adress: 'any_adress',
        },
      },
    })

    const { users } = await sut.execute()

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userOne.id,
        }),
        expect.objectContaining({
          id: userTwo.id,
        }),
      ]),
    )
  })
})
