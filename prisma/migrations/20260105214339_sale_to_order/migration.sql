/*
  Warnings:

  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voucher_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_client_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_form_of_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_state_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale" DROP CONSTRAINT "sale_voucher_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale_detail" DROP CONSTRAINT "sale_detail_artwork_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale_detail" DROP CONSTRAINT "sale_detail_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."voucher_detail" DROP CONSTRAINT "voucher_detail_artwork_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."voucher_detail" DROP CONSTRAINT "voucher_detail_voucher_id_fkey";

-- DropTable
DROP TABLE "public"."sale";

-- DropTable
DROP TABLE "public"."sale_detail";

-- DropTable
DROP TABLE "public"."voucher_detail";

-- CreateTable
CREATE TABLE "public"."order" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "voucher_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "form_of_payment_id" INTEGER NOT NULL,
    "order_type" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_detail" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_form_of_payment_id_fkey" FOREIGN KEY ("form_of_payment_id") REFERENCES "public"."form_of_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "order_detail_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "public"."artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
