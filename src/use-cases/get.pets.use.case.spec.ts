import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { GetPetsUseCase } from './get.pets.use.case'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get pets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get all pets', async () => {
    const petOne = await petsRepository.create({
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

    const petTwo = await petsRepository.create({
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

    const { pets } = await sut.execute()

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: petOne.id,
        }),
        expect.objectContaining({
          id: petTwo.id,
        }),
      ]),
    )
  })
})
