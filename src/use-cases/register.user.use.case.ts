import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './err/user.already.exists'
import { User } from '@prisma/client'

interface RegisterUserUseCaseProps {
  id?: string
  name: string
  email: string
  password: string
  photo?: string
  organizationId?: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    photo,
    organizationId,
  }: RegisterUserUseCaseProps): Promise<RegisterUserUseCaseResponse> {
    const hashedPassword = await hash(password, 10)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      id,
      name,
      email,
      password: hashedPassword,
      photo,
      organizationId,
    })

    return {
      user,
    }
  }
}
