import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma.users.repository'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseProps {
  name: string
  email: string
  password: string
  photo: string
}

export async function registerUserUseCase({
  name,
  email,
  password,
  photo,
}: RegisterUserUseCaseProps) {
  const hashedPassword = await hash(password, 10)

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('User already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password: hashedPassword,
    photo,
  })
}
