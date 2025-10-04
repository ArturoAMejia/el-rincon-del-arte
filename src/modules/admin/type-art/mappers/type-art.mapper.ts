import { type_art } from "@/generated/prisma";

export class TypeArtMapper {
  static toDTO(entity: type_art) {
    return {
      id: entity.id,
      name: entity.name,
      state_id: entity.state_id,
    };
  }
}
