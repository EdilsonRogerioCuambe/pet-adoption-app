import { it, describe, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { GetPetsUseCase } from './get.pets.use.case'

describe('Get pets use case', () => {
  it('should be able to get all pets', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new GetPetsUseCase(petsRepository)

    const petOne = await petsRepository.create({
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

    const petTwo = await petsRepository.create({
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
