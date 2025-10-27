/*
  Warnings:

  - You are about to drop the column `colectlion_id` on the `artwork` table. All the data in the column will be lost.
  - Added the required column `collection_id` to the `artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."artwork" DROP CONSTRAINT "artwork_colectlion_id_fkey";

-- AlterTable
ALTER TABLE "public"."artwork" DROP COLUMN "colectlion_id",
ADD COLUMN     "collection_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
