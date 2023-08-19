import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'

interface DeleteUserUseCaseResponse {
  user: User
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    await this.usersRepository.delete(id)

    return { user }
  }
}
