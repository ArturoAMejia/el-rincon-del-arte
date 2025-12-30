import { prisma } from "@/lib/prisma";
import { FormOfPaymentMapper } from "../mappers";
import { FormOfPaymentEntity } from "../interfaces";
export const getFormOfPayments = async (): Promise<
  FormOfPaymentEntity[] | []
> => {
  try {
    const form_of_payments = await prisma.form_of_payment.findMany();

    if (!form_of_payments) return [];
    return form_of_payments.map(FormOfPaymentMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener las colecciones`, error);
    throw error;
  }
};
