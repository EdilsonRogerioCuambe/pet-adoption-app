/*
  Warnings:

  - Made the column `email` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
