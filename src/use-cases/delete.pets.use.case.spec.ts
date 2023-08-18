import { it, describe, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in.memory.pets.repository'
import { DeletePetUseCase } from './delete.pets.use.case'

describe('Delete pet use case', () => {
  it('should be able to delete a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new DeletePetUseCase(petsRepository)

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

    const { pet: deletedPet } = await sut.execute(pet.id)

    expect(deletedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
