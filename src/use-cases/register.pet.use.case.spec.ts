import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register.pet.use.case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const pet = await sut.execute({
      id: 'any_id',
      name: 'Hulk',
      age: '2',
      breed: 'Pitbull',
      size: 'Big',
      description: 'A big dog',
      images: ['image1', 'image2'],
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      userId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
