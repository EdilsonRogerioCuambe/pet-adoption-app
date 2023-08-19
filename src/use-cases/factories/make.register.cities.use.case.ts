import { PrismaCitiesRepository } from '@/repositories/prisma/prisma.cities.repository'
import { RegisterCityUseCase } from '../register.city.use.case'

export function makeRegisterCitiesUseCase() {
  const citiesRepository = new PrismaCitiesRepository()
  const registerCitiesUseCase = new RegisterCityUseCase(citiesRepository)
  return registerCitiesUseCase
}
