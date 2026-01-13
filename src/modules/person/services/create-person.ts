import { prisma } from "@/lib/prisma";
import { createPersonDto, CreatePersonDto } from "@/modules/person/dto/person.dto";
import { PersonEntity } from "@/modules/person/interfaces/person.interface";
import { PersonMapper } from "@/modules/person/mappers/person.mapper";

export const createPersonService = async (personData: CreatePersonDto): Promise<PersonEntity> => {
  try {
    const parsed = createPersonDto.parse(personData);

    const created = await prisma.person.create({
      data: {
        name: parsed.name,
        last_name_business_name: parsed.last_name_business_name,
        id_ruc: parsed.id_ruc,
        phone_number: parsed.phone_number || "",
        email: parsed.email,
        birthday: parsed.birthday ? new Date(parsed.birthday) : new Date(),
        address: parsed.address || "",
        state_id: 1,
      },
    });

    return PersonMapper.toDTO(created);
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error(String(error));
  }
};
