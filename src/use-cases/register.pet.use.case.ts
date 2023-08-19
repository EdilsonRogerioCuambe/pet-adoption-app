import { PetsRepository } from '@/repositories/pets.repository'

interface RegisterPetUseCaseProps {
  id: string
  name: string
  age: string
  breed: string
  size: string
  description: string
  images: string[]
  cityId: string
  organizationId: string
  userId: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    age,
    breed,
    size,
    description,
    images,
    cityId,
    organizationId,
    userId,
  }: RegisterPetUseCaseProps) {
    const pet = await this.petsRepository.create({
      id,
      name,
      age,
      breed,
      size,
      description,
      images,
      userId,
      cityId,
      organizationId,
    })

    return pet
  }
}
