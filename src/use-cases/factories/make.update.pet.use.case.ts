import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { UpdatePetUseCase } from '../update.pets.use.case'

export const makeUpdatePetUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const updatePetUseCase = new UpdatePetUseCase(petsRepository)
  return updatePetUseCase
}
