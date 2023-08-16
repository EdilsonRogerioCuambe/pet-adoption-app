import { PetsRepository } from '@/repositories/pets.repository'

interface RegisterPetUseCaseProps {
  name: string
  age: string
  breed: string
  size: string
  description: string
  images: string[]
  city: string
  organizationId: string
  userId: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    breed,
    size,
    description,
    images,
    city,
    organizationId,
    userId,
  }: RegisterPetUseCaseProps) {
    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      size,
      description,
      images,
      user: {
        connect: {
          id: userId,
        },
      },
      city: {
        connect: {
          id: city,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    })

    return pet
  }
}
