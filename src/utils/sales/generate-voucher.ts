import { prisma } from "@/lib/prisma";

export const generateVoucher = async (
  client_id: number,
  currency_id: number,
  form_of_payment_id: number
) => {
  const voucher = await prisma.voucher.create({
    data: {
      state_id: 1,
      client_id,
      currency_id,
      form_of_payment_id,
    },
  });

  return voucher;
};
