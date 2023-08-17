import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      name: data.name,
      email: data.email,
      password: data.password,
      organizationId: data.organization as string | null,
      photo: data.photo as string | null,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }
}
