import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { SearchPetsByBreedUseCase } from '@/use-cases/search.pets.by.breed.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: SearchPetsByBreedUseCase
let petsRepository: InMemoryPetsRepository

describe('Search Pets By Breed Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByBreedUseCase(petsRepository)
  })

  it('should be able to search pets by breed', async () => {
    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        id: `${i}`,
        name: 'any_name',
        age: 'any_age',
        breed: `any_breed_${i}`,
        size: 'any_size',
        description: 'any_description',
        images: ['any_image'],
        organizationId: 'any_organization_id',
        userId: 'any_user_id',
        city: 'any_city',
        adopted: false,
      })
    }

    const { pets } = await sut.execute({
      breed: 'any_breed_1',
    })

    expect(pets.length).toBe(1)
  })
})
