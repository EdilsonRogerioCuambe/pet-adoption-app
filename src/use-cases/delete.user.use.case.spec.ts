import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { DeleteUserUseCase } from './delete.user.use.case'
import { it, describe, expect } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  it('should delete a user', async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)

    const user = await inMemoryUsersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })

    const response = await sut.execute(user.id)

    expect(response.user).toEqual(user)
  })
})
