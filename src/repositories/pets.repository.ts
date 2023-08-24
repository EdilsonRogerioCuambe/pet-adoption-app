import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  searchPetsByCity(query: string): Promise<Pet[]>
  searchPetsByAge(age: string): Promise<Pet[]>
  update(id: string, data: Prisma.PetUncheckedUpdateInput): Promise<Pet>
  delete(id: string): Promise<void>
}
