import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  async findById(id: string): Promise<{
    id: string
    photo: string | null
    name: string
    email: string
    password: string
    organizationId: string | null
  } | null> {
    const user = this.users.find((user) => user.id === id)

    return user || null
  }

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
    data: Prisma.UserUncheckedUpdateInput,
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
      organizationId: data.organizationId as string | null,
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

  async create(data: Prisma.UserUncheckedCreateInput): Promise<{
    id: string
    photo: string | null
    name: string
    email: string
    password: string
    organizationId: string | null
  }> {
    const user = {
      id: data.id as string,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      organizationId: data.organizationId as string | null,
      photo: data.photo as string | null,
    }

    this.users.push(user)

    return Promise.resolve(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }
}
