import { sale } from "@/generated/prisma";
import { SaleEntity } from "../interfaces";

export type SaleWithRelations = sale & {
  order: {
    id: number;
    state_id: number;
    client: {
      id: number;
      person: { name: string; last_name_business_name: string } | null;
    };
    currency: { id: number; name: string };
    form_of_payment: { id: number; name: string };
    order_type: string;
    subtotal: number;
    tax: number;
    total: number;
    created_at: Date;
    order_detail: {
      id: number;
      order_id: number;
      artwork_id: number;
      quantity: number;
      price: number;
      amount: number;
      artwork: {
        id: number;
        name: string;
        state_id: number;
        artist: {
          id: number;
          person: { name: string; last_name_business_name: string };
        };
        collection_id: number;
        category_id: number;
        type_art_id: number;
        size_id: number;
        artist_id: number;
        collection: { id: number; name: string };
        category: { id: number; name: string };
        type_art: { id: number; name: string };
        size: { id: number; name: string };
        dimension: string;
        description: string;
        price: number;
      };
    }[];
  };
  voucher: {
    id: number;
    numeration: string | null;
    serie: string | null;
  };
};

export class SaleMapper {
  static toDTO(entity: SaleWithRelations): SaleEntity {
    const clientName = entity.order.client?.person
      ? `${entity.order.client.person.name} ${entity.order.client.person.last_name_business_name}`
      : null;

    return {
      id: entity.id,
      state_id: entity.state_id,
      total: entity.total,
      created_at: entity.created_at,
      voucher: {
        id: entity.voucher.id,
        numeration: entity.voucher.numeration,
        serie: entity.voucher.serie,
      },
      order: {
        id: entity.order.id,
        client: clientName,
        currency: entity.order.currency?.name ?? null,
        form_of_payment: entity.order.form_of_payment?.name ?? null,
        order_type: entity.order.order_type,
        subtotal: entity.order.subtotal,
        tax: entity.order.tax,
        total: entity.order.total,
        created_at: entity.order.created_at,
        order_detail: entity.order.order_detail.map((detail) => ({
          id: detail.id,
          order_id: detail.order_id,
          artwork_id: detail.artwork_id,
          quantity: detail.quantity,
          price: detail.price,
          amount: detail.amount,
          artwork: {
            ...detail.artwork,
            state_id: detail.artwork.state_id,
            artist: `${detail.artwork.artist.person.name} ${detail.artwork.artist.person.last_name_business_name}`,
            collection: detail.artwork.collection?.name ?? null,
            category: detail.artwork.category?.name ?? null,
            type_art: detail.artwork.type_art?.name ?? null,
            size: detail.artwork.size?.name ?? null,
          },
        })),
      },
    };
  }
}
