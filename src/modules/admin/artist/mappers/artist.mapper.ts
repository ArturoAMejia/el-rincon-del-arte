import { artist, person } from "@/generated/prisma";

export class ArtistMapper {
  static toDTO(
    entity: artist & {
      person: person | null;
    }
  ) {
    return {
      id: entity.id,
      person_id: entity.person_id,
      id_ruc: entity.person ? entity.person.id_ruc : null,
      name: entity.person
        ? `${entity.person.name} ${entity.person.last_name_business_name}`
        : null,
      bio: entity.bio,
      style: entity.style,
      phone_number: entity.person ? entity.person.phone_number : null,
      email: entity.person ? entity.person.email : null,
      birthday: entity.person
        ? entity.person.birthday
          ? entity.person.birthday.toISOString().split("T")[0] // Format YYYY-MM-DD
          : null
        : null,
      address: entity.person ? entity.person.address : null,
      state_id: entity.state_id,
    };
  }
}
