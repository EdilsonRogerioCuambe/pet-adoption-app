import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { SearchPetsByBreedUseCase } from '../search.pets.by.breed.use.case'

export function makeSearchPetsByBreedUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsByBreedUseCase = new SearchPetsByBreedUseCase(petsRepository)
  return searchPetsByBreedUseCase
}
