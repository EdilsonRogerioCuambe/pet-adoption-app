import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface GetPetsByOrganizationUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByOrganizationUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    organization: string,
  ): Promise<GetPetsByOrganizationUseCaseResponse> {
    const pets = await this.petsRepository.getPetsByOrganization(organization)

    return {
      pets,
    }
  }
}
