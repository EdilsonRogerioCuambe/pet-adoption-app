import { it, describe, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { GetPetUseCase } from './get.pet.use.case'

describe('Get pet use case', () => {
  it('should be able to get a pet by his id', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new GetPetUseCase(petsRepository)

    const pet = await petsRepository.create({
      name: 'any_name',
      age: 'any_age',
      breed: 'any_breed',
      size: 'any_size',
      description: 'any_description',
      images: ['any_image_url'],
      organization: {
        create: {
          name: 'any_organization_name',
          whatsapp: 'any_whatsapp',
          adress: 'any_adress',
        },
      },
      user: {
        create: {
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
          photo: 'any_photo_url',
        },
      },
      city: {
        create: {
          name: 'any_city_name',
        },
      },
    })

    const { pet: foundedPet } = await sut.execute({ id: pet.id })

    expect(foundedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
