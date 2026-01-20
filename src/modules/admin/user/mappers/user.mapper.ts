import { person, state, User } from "@/generated/prisma";

export class UserMapper {
  static toDTO(
    entity: User & { person?: person | null; state?: state | null }
  ) {
    return {
      id: entity.id,
      name: entity.name,
      person_name:
        entity.person?.name + " " + entity.person?.last_name_business_name,
      emailVerified: entity.emailVerified,
      image: entity.image ?? null,
      createdAt: entity.createdAt ? entity.createdAt.toISOString() : null,
      updatedAt: entity.updatedAt ? entity.updatedAt.toISOString() : null,
      personId: entity.personId ?? null,
      role: entity.role ?? null,
      stateId: entity.stateId ?? null,
      state: entity.state
        ? { id: entity.state.id, name: entity.state.name }
        : null,
      id_ruc: entity.person ? entity.person.id_ruc : null,
      last_name_business_name: entity.person
        ? entity.person.last_name_business_name
        : null,
      phone_number: entity.person ? entity.person.phone_number : null,
      address: entity.person ? entity.person.address : null,
      birthday: entity.person
        ? entity.person.birthday
          ? entity.person.birthday.toISOString()
          : null
        : null,
      email: entity.person ? entity.person.email : entity.email,
    };
  }
}
