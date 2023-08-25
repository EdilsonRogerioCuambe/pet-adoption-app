import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async searchPetsBySize(size: string) {
    const pets = await prisma.pet.findMany({
      where: {
        size,
      },
    })

    return pets
  }

  async searchPetsByBreed(breed: string) {
    const pets = await prisma.pet.findMany({
      where: {
        breed,
      },
    })

    return pets
  }

  async searchPetsByAge(age: string) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
      },
    })

    return pets
  }

  async searchPetsByCity(query: string) {
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

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAll() {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async update(id: string, data: Prisma.PetUpdateInput) {
    const pet = await prisma.pet.update({
      where: {
        id,
      },
      data,
    })

    return pet
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
