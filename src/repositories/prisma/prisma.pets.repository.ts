import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput): Promise<{
    id: string
    name: string
    age: string
    breed: string
    size: string
    description: string
    images: string[]
    cityId: string
    organizationId: string
    userId: string
  }> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAll(): Promise<
    {
      id: string
      name: string
      age: string
      breed: string
      size: string
      description: string
      images: string[]
      cityId: string
      organizationId: string
      userId: string
    }[]
  > {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async findById(id: string): Promise<{
    id: string
    name: string
    age: string
    breed: string
    size: string
    description: string
    images: string[]
    cityId: string
    organizationId: string
    userId: string
  } | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async update(
    id: string,
    data: Prisma.PetUpdateInput,
  ): Promise<{
    id: string
    name: string
    age: string
    breed: string
    size: string
    description: string
    images: string[]
    cityId: string
    organizationId: string
    userId: string
  }> {
    const pet = await prisma.pet.update({
      where: {
        id,
      },
      data,
    })

    return pet
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
