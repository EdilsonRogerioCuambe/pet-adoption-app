import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
  async searchPetsBySize(size: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.size === size)

    return Promise.resolve(pets)
  }

  async searchPetsByBreed(breed: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.breed === breed)

    return Promise.resolve(pets)
  }

  async searchPetsByAge(age: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.age === age)

    return Promise.resolve(pets)
  }

  private pets: Pet[] = []

  async searchPetsByCity(query: string): Promise<Pet[]> {
    return this.pets.filter((pet) => pet.city?.includes(query))
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: 'any_id',
      name: data.name as string,
      age: data.age as string,
      breed: data.breed as string,
      size: data.size as string,
      description: data.description as string,
      images: data.images as string[],
      organizationId: data.organizationId as string,
      userId: data.userId as string,
      city: data.city as string,
      adopted: data.adopted as boolean,
    }

    this.pets.push(pet)

    return pet
  }

  findAll(): Promise<Pet[]> {
    const pets = this.pets

    return Promise.resolve(pets)
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet || null
  }

  async update(id: string, data: Prisma.PetUncheckedUpdateInput): Promise<Pet> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    const updatedPet: Pet = {
      ...pet,
      ...data,
      id: pet.id,
      name: data.name as string,
      age: data.age as string,
      breed: data.breed as string,
      size: data.size as string,
      description: data.description as string,
      images: data.images as string[],
      organizationId: data.organizationId as string,
      userId: data.userId as string,
      city: data.city as string,
      adopted: data.adopted as boolean,
    }

    this.pets = this.pets.map((pet) => (pet.id === id ? updatedPet : pet))

    return updatedPet
  }

  async delete(id: string): Promise<void> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    this.pets = this.pets.filter((pet) => pet.id !== id)

    return Promise.resolve()
  }
}
