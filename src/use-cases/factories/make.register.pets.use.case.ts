import { PrismaPetsRepository } from '@/repositories/prisma/prisma.pets.repository'
import { RegisterPetUseCase } from '../register.pet.use.case'

export const makeRegisterPetsUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const registerPetsUseCase = new RegisterPetUseCase(petsRepository)
  return registerPetsUseCase
}
