import { artwork } from "@/generated/prisma";

export class ArtworkMapper {
  static toDTO(
    entity: artwork & {
      category: { id: number; name: string };
      type_art: { id: number; name: string };
      collection: { id: number; name: string };
      size: { id: number; name: string };
      artist: {
        id: number;
        person: { name: string; last_name_business_name: string };
      };
    }
  ) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      artist_id: entity.artist_id,
      collection_id: entity.collection_id,
      category_id: entity.category_id,
      type_art: entity.type_art ? entity.type_art.name : null,
      type_art_id: entity.type_art_id,
      size_id: entity.size_id,
      dimension: entity.dimension,
      artist: entity.artist
        ? `${entity.artist.person.name} ${entity.artist.person.last_name_business_name}`
        : null,
      category: entity.category ? entity.category.name : null,
      collection: entity.collection ? entity.collection.name : null,
      size: entity.size ? entity.size.name : null,
    };
  }
}
