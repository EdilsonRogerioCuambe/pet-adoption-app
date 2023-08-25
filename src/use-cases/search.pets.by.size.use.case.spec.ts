import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { SearchPetsBySizeUseCase } from './search.pets.by.size.use.case'
import { it, expect, describe, beforeEach } from 'vitest'

let sut: SearchPetsBySizeUseCase
let petsRepository: InMemoryPetsRepository

describe('Search Pets By Size Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsBySizeUseCase(petsRepository)
  })

  it('should return a list of pets', async () => {
    const pets = await sut.execute({ size: 'small' })

    expect(pets).toBeDefined()
  })
})
