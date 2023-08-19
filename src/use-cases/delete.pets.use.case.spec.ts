import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { DeletePetUseCase } from './delete.pets.use.case'

let petsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(petsRepository)
  })

  it('should be able to delete a pet', async () => {
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
      cityId: 'any_city_id',
    })

    const { pet: deletedPet } = await sut.execute(pet.id)

    expect(deletedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
