import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'

interface UpdateUserUseCaseProps {
  id: string
  name?: string
  email?: string
  password?: string
  photo?: string
  organizationId?: string
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    photo,
    organizationId,
  }: UpdateUserUseCaseProps): Promise<User> {
    const user = await this.usersRepository.update(id, {
      id,
      name,
      email,
      password,
      photo,
      organizationId,
    })

    return user
  }
}
