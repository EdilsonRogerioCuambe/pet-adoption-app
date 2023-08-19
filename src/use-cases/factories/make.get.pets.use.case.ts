import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { GetPetsUseCase } from '../get.pets.use.case'

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetsUseCase = new GetPetsUseCase(petsRepository)
  return getPetsUseCase
}
