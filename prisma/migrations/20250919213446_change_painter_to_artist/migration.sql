/*
  Warnings:

  - You are about to drop the column `painter_id` on the `artwork` table. All the data in the column will be lost.
  - You are about to drop the `painter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artist_id` to the `artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."artwork" DROP CONSTRAINT "artwork_painter_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."painter" DROP CONSTRAINT "painter_person_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."painter" DROP CONSTRAINT "painter_state_id_fkey";

-- AlterTable
ALTER TABLE "public"."artwork" DROP COLUMN "painter_id",
ADD COLUMN     "artist_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."painter";

-- CreateTable
CREATE TABLE "public"."artist" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "person_id" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artist" ADD CONSTRAINT "artist_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artist" ADD CONSTRAINT "artist_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
