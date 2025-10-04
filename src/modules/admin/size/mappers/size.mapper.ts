import { size } from "@/generated/prisma";

export class SizeMapper {
  static toDTO(entity: size) {
    return {
      id: entity.id,
      name: entity.name,
      state_id: entity.state_id,
    };
  }
}
