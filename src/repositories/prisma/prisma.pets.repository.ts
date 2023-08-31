import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async searchPetsBySize(size: string) {
    const pets = await prisma.pet.findMany({
      where: {
        size,
      },
      include: {
        user: true,
        organization: true,
      },
    })

    return pets
  }

  async searchPetsByBreed(breed: string) {
    const pets = await prisma.pet.findMany({
      where: {
        breed,
      },
      include: {
        user: true,
        organization: true,
      },
    })

    return pets
  }

  async searchPetsByAge(age: string) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
      },
      include: {
        user: true,
        organization: true,
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
      include: {
        user: true,
        organization: true,
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
    const pets = await prisma.pet.findMany({
      include: {
        user: true,
        organization: true,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        organization: true,
      },
    })

    return pet
  }

  async update(id: string, data: Prisma.PetUncheckedUpdateInput) {
    const pet = await prisma.pet.update({
      where: {
        id,
      },
      data,
      include: {
        user: true,
        organization: true,
      },
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
