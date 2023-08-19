import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { GetUsersUseCase } from './get.users.use.case'

let usersRepository: InMemoryUsersRepository
let sut: GetUsersUseCase

describe('Get users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUsersUseCase(usersRepository)
  })

  it('should be able to get all users', async () => {
    const userOne = await usersRepository.create({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      photo: 'any_photo_url',
      organizationId: 'any_organization_id',
    })

    const userTwo = await usersRepository.create({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      photo: 'any_photo_url',
      organizationId: 'any_organization_id',
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
