import { sale } from "@/generated/prisma";
import { SaleEntity } from "../interfaces";

export class SaleMapper {
  static toDTO(
    entity: sale & {
      voucher: {
        id: number;
        serie: string | null;
      };
      client: {
        id: number;
        person_id: number;
        client_type: string;
        person: { name: string; last_name_business_name: string } | null;
      };
      currency: { id: number; name: string; created_at: Date };
      form_of_payment: { id: number; name: string; created_at: Date };
      sale_detail: {
        id: number;
        sale_id: number;
        artwork_id: number;
        quantity: number;
        price: number;
        amount: number;
        artwork: {
          id: number;
          name: string;
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
    }
  ): SaleEntity {
    return {
      id: entity.id,
      state_id: entity.state_id,
      voucher: entity.voucher.serie || "",
      sale_detail: entity.sale_detail.map((detail) => ({
        sale_id: detail.sale_id,
        id: detail.id,
        quantity: detail.quantity,
        price: detail.price,
        amount: detail.amount,
        artwork_id: detail.artwork_id,
        artwork: {
          ...detail.artwork,
          artist: `${detail.artwork.artist.person.name} ${detail.artwork.artist.person.last_name_business_name}`,
          collection: detail.artwork.collection.name,
          category: detail.artwork.category.name,
          type_art: detail.artwork.type_art.name,
          size: detail.artwork.size.name,
        },
        dimension: detail.artwork.dimension,
        artist_id: detail.artwork.artist ? detail.artwork.artist.id : null,
        collection_id: detail.artwork.collection
          ? detail.artwork.collection.id
          : null,
        category_id: detail.artwork.category
          ? detail.artwork.category.id
          : null,
        type_art_id: detail.artwork.type_art
          ? detail.artwork.type_art.id
          : null,
      })),
      client: entity.client.person
        ? `${entity.client.person.name} ${entity.client.person.last_name_business_name}`
        : null,
      currency: entity.currency.name,
      form_of_payment: entity.form_of_payment.name,
      sale_type: entity.sale_type,
      subtotal: entity.subtotal,
      tax: entity.tax,
      total: entity.total,
      created_at: entity.created_at,
    };
  }
}
