import { it, describe, expect, beforeEach } from 'vitest'
import { UpdateUserUseCase } from './update.user.use.case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update a user', async () => {
    const user = await usersRepository.create({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      photo: 'any_photo_url',
      organizationId: 'any_organization_id',
    })

    const updatedUser = await sut.execute({
      id: user.id,
      name: 'new_name',
      email: 'new_email',
      password: 'new_password',
      photo: 'new_photo_url',
      organizationId: 'new_organization_id',
    })

    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: user.id,
        name: 'new_name',
        email: 'new_email',
        password: 'new_password',
        photo: 'new_photo_url',
        organizationId: 'new_organization_id',
      }),
    )
  })
})
