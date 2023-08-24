import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { SearchPetsByAgeUseCase } from './search.pets.by.age.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: SearchPetsByAgeUseCase
let petsRepository: InMemoryPetsRepository

describe('Search Pets By Age Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByAgeUseCase(petsRepository)
  })

  it('should be able to search pets by age', async () => {
    const pet = await petsRepository.create({
      id: 'any_id',
      name: 'any_name',
      age: '12',
      city: 'any_city',
      breed: 'any_breed',
      description: 'any_description',
      organizationId: 'any_organization_id',
      size: 'any_size',
      userId: 'any_user_id',
      images: ['any_image'],
    })

    const response = await sut.execute({ age: '12' })

    expect(response.pets).toEqual([pet])
  })
})
