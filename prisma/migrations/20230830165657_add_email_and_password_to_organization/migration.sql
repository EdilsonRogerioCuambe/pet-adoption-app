-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "email" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';
