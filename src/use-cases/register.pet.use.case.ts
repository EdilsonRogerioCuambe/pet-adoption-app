import { PetsRepository } from '@/repositories/pets.repository'

interface RegisterPetUseCaseProps {
  id?: string
  name: string
  age: string
  breed: string
  size: string
  description: string
  images: string[]
  organizationId: string
  userId: string
  city?: string
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
    organizationId,
    userId,
    city,
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
      organizationId,
      city,
    })

    return pet
  }
}
