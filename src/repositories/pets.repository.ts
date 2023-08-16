import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAll(): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  update(id: string, data: Prisma.PetUpdateInput): Promise<Pet>
  delete(id: string): Promise<void>
}
