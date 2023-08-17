import { it, describe, expect } from 'vitest'
import { RegisterPetUseCase } from './register.pet.use.case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'

describe('Register Pet Use Case', () => {
  it('should be able to register a new pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const registerPetUseCase = new RegisterPetUseCase(petsRepository)

    const pet = await registerPetUseCase.execute({
      name: 'Hulk',
      age: '2',
      breed: 'Pitbull',
      size: 'Big',
      description: 'A big dog',
      images: ['image1', 'image2'],
      city: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      organizationId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      userId: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
