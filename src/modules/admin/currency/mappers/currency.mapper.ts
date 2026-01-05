import { currency } from "@/generated/prisma";

export class CurrencyMapper {
  static toDTO(entity: currency) {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
