import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CitiesRepository } from '../cities.repository'

export class PrismaCitiesRepository implements CitiesRepository {
  async create(
    data: Prisma.CityCreateInput,
  ): Promise<{ id: string; name: string }> {
    const city = await prisma.city.create({
      data,
    })

    return city
  }

  async findById(id: string): Promise<{ id: string; name: string } | null> {
    const city = await prisma.city.findUnique({
      where: {
        id,
      },
    })

    return city ? { id: city.id, name: city.name } : null
  }
}
