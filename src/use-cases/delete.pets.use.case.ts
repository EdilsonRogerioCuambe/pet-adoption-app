import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface DeletePetUseCaseResponse {
  pet: Pet
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<DeletePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    await this.petsRepository.delete(id)

    return { pet }
  }
}
