import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCitiesRepository } from '@/repositories/in-memory/in.memory.cities.repository'
import { RegisterCityUseCase } from './register.city.use.case'

let citiesRepository: InMemoryCitiesRepository
let sut: RegisterCityUseCase

describe('Register city use case', () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository()
    sut = new RegisterCityUseCase(citiesRepository)
  })

  it('should be able to register a new city', async () => {
    const city = await sut.execute({ name: 'any_name' })

    expect(city).toEqual(
      expect.objectContaining({
        id: city.id,
      }),
    )
  })
})
