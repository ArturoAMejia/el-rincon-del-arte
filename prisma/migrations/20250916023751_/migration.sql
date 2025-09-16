/*
  Warnings:

  - You are about to drop the column `colection_id` on the `artwork` table. All the data in the column will be lost.
  - You are about to drop the `colection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colectlion_id` to the `artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."artwork" DROP CONSTRAINT "artwork_colection_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."colection" DROP CONSTRAINT "colection_state_id_fkey";

-- AlterTable
ALTER TABLE "public"."artwork" DROP COLUMN "colection_id",
ADD COLUMN     "colectlion_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."colection";

-- CreateTable
CREATE TABLE "public"."collection" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."collection" ADD CONSTRAINT "collection_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_colectlion_id_fkey" FOREIGN KEY ("colectlion_id") REFERENCES "public"."collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
