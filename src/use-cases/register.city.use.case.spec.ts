import { it, describe, expect } from 'vitest'
import { InMemoryCitiesRepository } from '@/repositories/in-memory/in.memory.cities.repository'
import { RegisterCityUseCase } from './register.city.use.case'

describe('Register city use case', () => {
  it('should be able to register a new city', async () => {
    const citiesRepository = new InMemoryCitiesRepository()
    const sut = new RegisterCityUseCase(citiesRepository)

    const city = await sut.execute({ name: 'any_name' })

    expect(city).toEqual(
      expect.objectContaining({
        id: city.id,
      }),
    )
  })
})
