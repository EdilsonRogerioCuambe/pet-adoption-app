import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseProps {
  name: string
  email: string
  password: string
  photo: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, photo }: RegisterUserUseCaseProps) {
    const hashedPassword = await hash(password, 10)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      photo,
    })
  }
}
