import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { DeletePetUseCase } from '../delete.pets.use.case'

export function makeDeletePetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const deletePetsUseCase = new DeletePetUseCase(petsRepository)
  return deletePetsUseCase
}
