import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { UpdateUserUseCase } from '../update.user.use.case'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(usersRepository)
  return updateUserUseCase
}
