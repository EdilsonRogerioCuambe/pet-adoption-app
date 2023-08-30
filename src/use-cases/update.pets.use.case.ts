import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface UpdatePetUseCaseProps {
  id: string
  name?: string
  age?: string
  breed?: string
  size?: string
  description?: string
  images?: string[]
  city?: string
}

export class UpdatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    age,
    breed,
    size,
    description,
    images,
    city,
  }: UpdatePetUseCaseProps): Promise<Pet> {
    const pet = await this.petsRepository.update(id, {
      id,
      name,
      age,
      breed,
      size,
      description,
      images,
      city,
    })

    return pet
  }
}
