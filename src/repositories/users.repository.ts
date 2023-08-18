import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  delete(id: string): Promise<User>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
}
