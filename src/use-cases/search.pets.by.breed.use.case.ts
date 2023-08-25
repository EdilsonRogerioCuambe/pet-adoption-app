import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets.repository'

interface SearchPetsByBreedUseCaseRequest {
  breed: string
}

interface SearchPetsByBreedUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByBreedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    breed,
  }: SearchPetsByBreedUseCaseRequest): Promise<SearchPetsByBreedUseCaseResponse> {
    const pets = await this.petsRepository.searchPetsByBreed(breed)

    return {
      pets,
    }
  }
}
