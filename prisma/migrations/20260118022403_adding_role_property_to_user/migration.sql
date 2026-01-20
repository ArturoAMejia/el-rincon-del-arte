/*
  Warnings:

  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `module_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_module_role` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `createdAt` on table `verification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `verification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."module_role" DROP CONSTRAINT "module_role_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."module_role" DROP CONSTRAINT "module_role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role" DROP CONSTRAINT "role_state_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_module" DROP CONSTRAINT "sub_module_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_module_role" DROP CONSTRAINT "sub_module_role_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_module_role" DROP CONSTRAINT "sub_module_role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_module_role" DROP CONSTRAINT "sub_module_role_sub_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_roleId_fkey";

-- AlterTable
ALTER TABLE "public"."account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."session" ADD COLUMN     "impersonatedBy" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "roleId",
ADD COLUMN     "banExpires" TIMESTAMP(3),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN DEFAULT false,
ADD COLUMN     "role" TEXT,
ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."verification" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "public"."module";

-- DropTable
DROP TABLE "public"."module_role";

-- DropTable
DROP TABLE "public"."role";

-- DropTable
DROP TABLE "public"."sub_module";

-- DropTable
DROP TABLE "public"."sub_module_role";

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "public"."account"("userId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "public"."session"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "public"."verification"("identifier");
