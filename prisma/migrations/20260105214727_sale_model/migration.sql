/*
  Warnings:

  - You are about to drop the column `voucher_id` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_voucher_id_fkey";

-- AlterTable
ALTER TABLE "public"."order" DROP COLUMN "voucher_id";

-- CreateTable
CREATE TABLE "public"."sale" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "order_id" INTEGER NOT NULL,
    "voucher_id" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
