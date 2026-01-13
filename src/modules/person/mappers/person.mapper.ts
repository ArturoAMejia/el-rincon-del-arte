import { person } from "@/generated/prisma";

export class PersonMapper {
  static toDTO(entity: person) {
    return {
      id: entity.id,
      name: entity.name,
      last_name_business_name: entity.last_name_business_name,
      id_ruc: entity.id_ruc,
      phone_number: entity.phone_number,
      email: entity.email,
      birthday: entity.birthday ? entity.birthday.toISOString() : null,
      address: entity.address,
      state_id: entity.state_id,
    };
  }
}
