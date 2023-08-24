import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface SearchPetByCityUseCaseRequest {
  query: string
}

interface SearchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: SearchPetByCityUseCaseRequest): Promise<SearchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.searchPetsByCity(query)

    return { pets }
  }
}
