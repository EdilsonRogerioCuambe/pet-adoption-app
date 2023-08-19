import { City } from '@prisma/client'
import { CitiesRepository } from '@/repositories/cities.repository'

interface DeleteCityUseCaseResponse {
  city: City
}

export class DeleteCityUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute(id: string): Promise<DeleteCityUseCaseResponse> {
    const city = await this.citiesRepository.findById(id)

    if (!city) {
      throw new Error('City not found')
    }

    await this.citiesRepository.delete(id)

    return { city }
  }
}
