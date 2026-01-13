import { prisma } from "@/lib/prisma";
import {
  updateFormOfPaymentDto,
  UpdateFormOfPaymentDto,
} from "../dto/form-of-payment.dto";
import { FormOfPaymentEntity } from "../interfaces";
import { FormOfPaymentMapper } from "../mappers";

export const updateFormOfPaymentService = async (
  id: number,
  formOfPayment: UpdateFormOfPaymentDto
): Promise<FormOfPaymentEntity> => {
  const exists = await prisma.form_of_payment.findUnique({ where: { id } });

  if (!exists) {
    throw new Error("Forma de pago no encontrada");
  }

  try {
    const updatedFormOfPayment = updateFormOfPaymentDto.parse(formOfPayment);

    const updated = await prisma.form_of_payment.update({
      where: { id },
      data: {
        name: updatedFormOfPayment.name,
      },
    });

    return FormOfPaymentMapper.toDTO(updated);
  } catch (error) {
    console.error("Error al actualizar la forma de pago", error);
    throw new Error(`Error al actualizar la forma de pago: ${error}`);
  }
};
