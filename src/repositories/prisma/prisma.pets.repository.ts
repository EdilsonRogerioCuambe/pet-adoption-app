import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async searchPetsByAge(age: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age,
      },
    })

    return pets
  }

  async searchPetsByCity(query: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAll(): Promise<Pet[]> {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async update(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
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
