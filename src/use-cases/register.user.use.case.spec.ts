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
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    const isPasswordHashed = await compare('@17johndoe17', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '@17johndoe17',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
