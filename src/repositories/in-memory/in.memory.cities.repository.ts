import { Prisma, City } from '@prisma/client'
import { CitiesRepository } from '../cities.repository'

export class InMemoryCitiesRepository implements CitiesRepository {
  private cities: City[] = []

  async findAll(): Promise<{ id: string; name: string }[]> {
    const cities = this.cities.map((city) => ({
      id: city.id,
      name: city.name,
    }))

    return cities
  }

  async create(
    data: Prisma.CityCreateInput,
  ): Promise<{ id: string; name: string }> {
    const city: City = {
      id: data.id as string,
      name: data.name as string,
    }

    return city
  }

  async findById(id: string): Promise<{ id: string; name: string } | null> {
    const city = this.cities.find((city) => city.id === id)

    return city || null
  }

  async delete(id: string): Promise<{ id: string; name: string }> {
    const city = this.cities.find((city) => city.id === id)

    if (!city) {
      throw new Error('City not found')
    }

    this.cities = this.cities.filter((city) => city.id !== id)

    return city
  }
}
