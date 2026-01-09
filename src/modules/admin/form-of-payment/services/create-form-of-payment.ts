import { prisma } from "@/lib/prisma";
import {
  createFormOfPaymentDto,
  CreateFormOfPaymentDto,
} from "../dto/form-of-payment.dto";
import { FormOfPaymentEntity } from "../interfaces";
import { FormOfPaymentMapper } from "../mappers";

export const createFormOfPaymentService = async (
  formOfPayment: CreateFormOfPaymentDto
): Promise<FormOfPaymentEntity> => {
  try {
    const newFormOfPayment = createFormOfPaymentDto.parse(formOfPayment);

    const created = await prisma.form_of_payment.create({
      data: {
        name: newFormOfPayment.name,
      },
    });

    return FormOfPaymentMapper.toDTO(created);
  } catch (error) {
    console.error("Error al crear la forma de pago", error);
    throw new Error(`Error al crear la forma de pago: ${error}`);
  }
};
