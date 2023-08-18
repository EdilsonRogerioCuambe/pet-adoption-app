import { Prisma, City } from '@prisma/client'
import { CitiesRepository } from '../cities.repository'

export class InMemoryCitiesRepository implements CitiesRepository {
  private cities: City[] = []

  async create(
    data: Prisma.CityCreateInput,
  ): Promise<{ id: string; name: string }> {
    const city: City = {
      id: '4fe2e48a-7e19-4f61-95ee-d9bd468dc00e',
      name: data.name,
    }

    return Promise.resolve(city)
  }

  async findById(id: string): Promise<{ id: string; name: string } | null> {
    const city = this.cities.find((city) => city.id === id)

    return city || null
  }
}
