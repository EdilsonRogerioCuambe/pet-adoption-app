import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { SearchPetByCityUseCase } from '../search.pet.by.city.use.case'

export function makeSearchPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetByCityUseCase = new SearchPetByCityUseCase(petsRepository)
  return searchPetByCityUseCase
}
