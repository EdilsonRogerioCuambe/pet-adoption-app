import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { SearchPetsByAgeUseCase } from '../search.pets.by.age.use.case'

export function makeSearchPetsByAgeUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsByAgeUseCase = new SearchPetsByAgeUseCase(petsRepository)
  return searchPetsByAgeUseCase
}
