import { Prisma, City } from '@prisma/client'

export interface CitiesRepository {
  create(data: Prisma.CityCreateInput): Promise<City>
  findById(id: string): Promise<City | null>
  findAll(): Promise<City[]>
  delete(id: string): Promise<City>
}
