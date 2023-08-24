/*
  Warnings:

  - You are about to drop the column `cityId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_cityId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "cityId";

-- DropTable
DROP TABLE "cities";
