import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { UpdatePetUseCase } from './update.pets.use.case'

let petsRepository: InMemoryPetsRepository
let sut: UpdatePetUseCase

describe('Update pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new UpdatePetUseCase(petsRepository)
  })

  it('should be able to update a pet', async () => {
    const pet = await petsRepository.create({
      id: 'any_id',
      name: 'any_name',
      age: 'any_age',
      breed: 'any_breed',
      size: 'any_size',
      description: 'any_description',
      images: ['any_image_url'],
      organizationId: 'any_organization_id',
      userId: 'any_user_id',
    })

    const updatedPet = await sut.execute({
      id: pet.id,
      name: 'updated_name',
      age: 'updated_age',
      breed: 'updated_breed',
      size: 'updated_size',
      description: 'updated_description',
      images: ['updated_image_url'],
    })

    expect(updatedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: 'updated_name',
        age: 'updated_age',
        breed: 'updated_breed',
        size: 'updated_size',
        description: 'updated_description',
        images: ['updated_image_url'],
      }),
    )
  })
})
