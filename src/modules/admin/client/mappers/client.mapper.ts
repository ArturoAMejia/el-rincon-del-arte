import { client, person } from "@/generated/prisma";

export class ClientMapper {
  static toDTO(entity: client & { person: person }) {
    return {
      id: entity.id,
      name: entity.person.name + " " + entity.person.last_name_business_name,
      person_id: entity.person_id,
      client_type: entity.client_type,
      gender: entity.gender,
      state_id: entity.state_id,
    };
  }
}
