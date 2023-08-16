import { CitiesRepository } from '@/repositories/cities.repository'

interface RegisterCityUseCaseProps {
  name: string
}

export class RegisterCityUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({ name }: RegisterCityUseCaseProps) {
    const city = await this.citiesRepository.create({
      name,
    })

    return city
  }
}
