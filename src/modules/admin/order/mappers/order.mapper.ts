import { order } from "@/generated/prisma";
import { OrderEntity } from "../interfaces";

export class OrderMapper {
  static toDTO(
    entity: order & {
      client: {
        id: number;
        person_id: number;
        client_type: string;
        person: { name: string; last_name_business_name: string } | null;
      };
      currency: { id: number; name: string; created_at: Date };
      form_of_payment: { id: number; name: string; created_at: Date };
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
  ): OrderEntity {
    return {
      id: entity.id,
      state_id: entity.state_id,
      order_detail: entity.order_detail.map((detail) => ({
        order_id: detail.order_id,
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
      order_type: entity.order_type,
      subtotal: entity.subtotal,
      tax: entity.tax,
      total: entity.total,
      created_at: entity.created_at,
    };
  }
}
