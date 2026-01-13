import { client, person } from "@/generated/prisma";

export class ClientMapper {
  static toDTO(
    entity: client & {
      person?: person | null;
    }
  ) {
    return {
      id: entity.id,
      person_id: entity.person_id,
      client_type: entity.client_type,
      gender: entity.gender,
      state_id: entity.state_id,
      id_ruc: entity.person ? entity.person.id_ruc : null,
      name: entity.person
        ? `${entity.person.name} ${entity.person.last_name_business_name}`
        : null,
      phone_number: entity.person ? entity.person.phone_number : null,
      email: entity.person ? entity.person.email : null,
      address: entity.person ? entity.person.address : null,
      birthday: entity.person
        ? entity.person.birthday
          ? entity.person.birthday.toISOString()
          : null
        : null,
    };
  }
}
