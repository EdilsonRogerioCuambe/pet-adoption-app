import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './err/user.already.exists'

interface RegisterUserUseCaseProps {
  name: string
  email: string
  password: string
  photo: string
  organizationId: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    photo,
    organizationId,
  }: RegisterUserUseCaseProps) {
    const hashedPassword = await hash(password, 10)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      photo,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    })
  }
}
