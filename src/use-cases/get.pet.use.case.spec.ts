import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { GetPetUseCase } from './get.pet.use.case'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet by his id', async () => {
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

    const { pet: foundedPet } = await sut.execute({ id: pet.id })

    expect(foundedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
