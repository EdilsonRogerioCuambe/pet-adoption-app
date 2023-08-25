import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface SearchPetsBySizeUseCaseRequest {
  size: string
}

interface SearchPetsBySizeUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsBySizeUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    size,
  }: SearchPetsBySizeUseCaseRequest): Promise<SearchPetsBySizeUseCaseResponse> {
    const pets = await this.petsRepository.searchPetsBySize(size)

    return { pets }
  }
}
