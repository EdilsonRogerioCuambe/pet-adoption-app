import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  delete(id: string): Promise<User>
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
  findById(id: string): Promise<User | null>
}
