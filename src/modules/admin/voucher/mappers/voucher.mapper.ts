import { voucher } from "@/generated/prisma";
import { VoucherEntity } from "../interfaces";

export class VoucherMapper {
  static toDTO(
    entity: voucher & {
      client: {
        id: number;
        person: { name: string; last_name_business_name: string } | null;
      };
      currency: { id: number; name: string };
      form_of_payment: { id: number; name: string };
      sale: { id: number; total: number; created_at: Date }[];
    }
  ): VoucherEntity {
    return {
      id: entity.id,
      state_id: entity.state_id,
      numeration: entity.numeration,
      serie: entity.serie,
      created_at: entity.created_at,
      client: entity.client.person
        ? `${entity.client.person.name} ${entity.client.person.last_name_business_name}`
        : null,
      currency: entity.currency?.name ?? null,
      form_of_payment: entity.form_of_payment?.name ?? null,
      sales: entity.sale.map((sale) => ({
        id: sale.id,
        total: sale.total,
        created_at: sale.created_at,
      })),
    };
  }
}
