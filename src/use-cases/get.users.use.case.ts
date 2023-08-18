import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'

interface GetUsersUseCaseResponse {
  users: User[]
}

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetUsersUseCaseResponse> {
    const users = await this.usersRepository.findAll()

    return {
      users,
    }
  }
}
