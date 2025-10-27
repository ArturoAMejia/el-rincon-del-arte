import { category } from "@/generated/prisma";

export class CategoryMapper {
  static toDTO(entity: category) {
    return {
      id: entity.id,
      name: entity.name,
      state_id: entity.state_id,
    };
  }
}
