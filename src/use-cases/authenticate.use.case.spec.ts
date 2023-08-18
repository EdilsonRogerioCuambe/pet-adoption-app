import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in.memory.users.repository'
import { AuthenticateUseCase } from './authenticate.use.case'
import { InvalidCredentialsError } from './err/invalid.credentials.error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should throw if user does not exist', async () => {
    const promise = sut.execute({
      email: 'invalid_email',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw if password does not match', async () => {
    const promise = sut.execute({
      email: 'any_email',
      password: 'invalid_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate an user', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('@17Edilson17', 10),
      photo: 'any_photo_url',
      organization: {
        create: {
          name: 'any_organization_name',
          whatsapp: 'any_whatsapp',
          adress: 'any_adress',
        },
      },
    })

    const { user } = await sut.execute({
      email: 'any_email',
      password: '@17Edilson17',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
