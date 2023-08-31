import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.user.use.case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { UserAlreadyExistsError } from './err/user.already.exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      role: 'ADMIN',
    })

    const isPasswordHashed = await compare('@17johndoe17', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      role: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '@17johndoe17',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      id: 'any_id',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      organizationId: 'any_organization_id',
      photo: 'any_photo_url',
      role: 'ADMIN',
    })

    expect(user.id).toEqual('any_id')
  })
})
