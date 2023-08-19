import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CitiesRepository } from '../cities.repository'

export class PrismaCitiesRepository implements CitiesRepository {
  async findAll(): Promise<{ id: string; name: string }[]> {
    const cities = await prisma.city.findMany()

    return cities.map((city) => ({ id: city.id, name: city.name }))
  }

  async delete(id: string): Promise<{ id: string; name: string }> {
    const city = await prisma.city.delete({
      where: {
        id,
      },
    })

    return city
  }

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
