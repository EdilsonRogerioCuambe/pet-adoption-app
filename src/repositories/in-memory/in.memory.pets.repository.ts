import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      name: data.name,
      age: data.age,
      breed: data.breed,
      size: data.size,
      description: data.description,
      images: data.images as string[],
      cityId: data.city as string,
      organizationId: data.organization as string,
      userId: data.user as string,
    }

    this.pets.push(pet)

    return pet
  }

  findAll(): Promise<
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
    throw new Error('Method not implemented.')
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
    const pet = this.pets.find((pet) => pet.id === id)

    return pet || null
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
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    const updatedPet: Pet = {
      ...pet,
      ...data,
      id: data.id as string,
      name: data.name as string,
      age: data.age as string,
      breed: data.breed as string,
      size: data.size as string,
      description: data.description as string,
      images: data.images as string[],
    }

    this.pets.push(updatedPet)

    return updatedPet
  }

  delete(id: string): Promise<void> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    this.pets = this.pets.filter((pet) => pet.id !== id)

    return Promise.resolve()
  }

  getPetsByCity(city: string): Promise<
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
    const pets = this.pets.filter((pet) => pet.cityId === city)

    return Promise.resolve(pets)
  }

  getPetsByOrganization(organization: string): Promise<
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
    const pets = this.pets.filter((pet) => pet.organizationId === organization)

    return Promise.resolve(pets)
  }
}
