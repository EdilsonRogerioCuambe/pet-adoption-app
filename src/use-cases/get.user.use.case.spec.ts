import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { GetUserUseCase } from './get.user.use.case'
import { it, expect, describe, beforeEach } from 'vitest'

let sut: GetUserUseCase
let usersRepository: InMemoryUsersRepository

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get a user by id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      id: '123',
      organizationId: null,
      photo: 'photo',
      role: 'MEMBER',
    })

    const result = await sut.execute(user.id)

    expect(result).toEqual(user)
  })
})
