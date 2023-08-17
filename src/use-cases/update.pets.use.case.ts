import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface UpdatePetUseCaseProps {
  id: string
  name: string
  age: string
  breed: string
  size: string
  description: string
  images: string[]
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
  }: UpdatePetUseCaseProps): Promise<Pet> {
    const pet = await this.petsRepository.update(id, {
      name,
      age,
      breed,
      size,
      description,
      images,
    })

    return pet
  }
}
