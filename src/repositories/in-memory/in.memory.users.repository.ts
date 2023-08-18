import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  delete(id: string): Promise<{
    id: string
    photo: string | null
    name: string
    email: string
    password: string
    organizationId: string | null
  }> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    this.users = this.users.filter((user) => user.id !== id)

    return Promise.resolve(user)
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<{
    id: string
    photo: string | null
    name: string
    email: string
    password: string
    organizationId: string | null
  }> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...user,
      ...data,
      id: user.id,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      organizationId: data.organization as string | null,
      photo: data.photo as string | null,
    }

    this.users = this.users.map((user) => (user.id === id ? updatedUser : user))

    return Promise.resolve(updatedUser)
  }

  private users: User[] = []

  findAll(): Promise<
    {
      id: string
      photo: string | null
      name: string
      email: string
      password: string
      organizationId: string | null
    }[]
  > {
    const users = this.users.map((user) => ({
      id: user.id,
      photo: user.photo,
      name: user.name,
      email: user.email,
      password: user.password,
      organizationId: user.organizationId,
    }))
    return Promise.resolve(users)
  }

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
