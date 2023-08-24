import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { SearchPetByCityUseCase } from './search.pet.by.city.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetByCityUseCase

describe('Search Pet By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByCityUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    await petsRepository.create({
      id: 'any_id',
      name: 'Hulk',
      age: '2',
      breed: 'Pitbull',
      size: 'Big',
      description: 'A big dog',
      images: ['image1', 'image2'],
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      userId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      city: 'São Paulo',
    })

    await petsRepository.create({
      id: 'any_id',
      name: 'Thor',
      age: '10',
      breed: 'Pitbull',
      size: 'Big',
      description: 'A big dog',
      images: ['image1', 'image2'],
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      userId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      city: 'Rio de Janeiro',
    })

    await petsRepository.create({
      id: 'any_id',
      name: 'Spider',
      age: '5',
      breed: 'Rottweiler',
      size: 'Big',
      description: 'A big dog',
      images: ['image1', 'image2'],
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      userId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      city: 'São Paulo',
    })

    const { pets } = await sut.execute({
      query: 'São Paulo',
    })

    expect(pets.length).toBe(2)
  })
})
