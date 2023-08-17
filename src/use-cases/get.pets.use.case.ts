import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll()

    return {
      pets,
    }
  }
}
