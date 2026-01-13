import { prisma } from "@/lib/prisma";

export const deleteFormOfPaymentService = async (id: number): Promise<void> => {
  const exists = await prisma.form_of_payment.findUnique({ where: { id } });

  if (!exists) {
    throw new Error("Forma de pago no encontrada");
  }

  await prisma.form_of_payment.delete({ where: { id } });
};
