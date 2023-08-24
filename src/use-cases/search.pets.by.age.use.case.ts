import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets.repository'

interface SearchPetsByAgeUseCaseRequest {
  age: string
}

interface SearchPetsByAgeUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByAgeUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
  }: SearchPetsByAgeUseCaseRequest): Promise<SearchPetsByAgeUseCaseResponse> {
    const pets = await this.petsRepository.searchPetsByAge(age)

    return { pets }
  }
}
