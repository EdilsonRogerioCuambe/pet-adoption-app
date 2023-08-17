import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register.user.use.case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { UserAlreadyExistsError } from './err/user.already.exists'

describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    const isPasswordHashed = await compare('@17johndoe17', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUseCase(usersRepository)

    await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    await expect(() =>
      registerUserUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '@17johndoe17',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17johndoe17',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
