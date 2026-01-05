import { form_of_payment } from "@/generated/prisma";

export class FormOfPaymentMapper {
  static toDTO(entity: form_of_payment) {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
