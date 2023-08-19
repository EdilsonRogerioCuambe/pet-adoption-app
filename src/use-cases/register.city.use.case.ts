import { CitiesRepository } from '@/repositories/cities.repository'

interface RegisterCityUseCaseProps {
  id: string
  name: string
}

export class RegisterCityUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({ id, name }: RegisterCityUseCaseProps) {
    const city = await this.citiesRepository.create({
      id,
      name,
    })

    return city
  }
}
