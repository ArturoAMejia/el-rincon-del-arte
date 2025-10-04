import { collection } from "@/generated/prisma";

export class CollectionMapper {
  static toDTO(entity: collection) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      state_id: entity.state_id,
    };
  }
}
