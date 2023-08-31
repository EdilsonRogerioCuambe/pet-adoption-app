/*
  Warnings:

  - You are about to drop the column `adress` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `address` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;
