import { prisma } from "@/lib/prisma";
import {
  updateUserDto,
  UpdateUserDto,
} from "@/modules/admin/user/dto/user.dto";
import { UserMapper } from "@/modules/admin/user/mappers";
import { UserEntity } from "@/modules/admin/user/interfaces";

export const updateUserService = async (
  data: UpdateUserDto
): Promise<UserEntity> => {
  try {
    const parsed = updateUserDto.parse(data);

    // Update person first
    await prisma.person.update({
      where: { id: parsed.person_id },
      data: {
        name: parsed.person.name,
        last_name_business_name: parsed.person.last_name_business_name,
        id_ruc: parsed.person.id_ruc,
        phone_number: parsed.person.phone_number ?? undefined,
        email: parsed.person.email,
        birthday: parsed.person.birthday
          ? new Date(parsed.person.birthday)
          : undefined,
        address: parsed.person.address ?? undefined,
      },
    });

    const updated = await prisma.user.update({
      where: { id: parsed.id },
      data: {
        name: parsed.name,
        email: parsed.email,
      },
      include: { person: true },
    });

    return UserMapper.toDTO(updated);
  } catch (error) {
    console.error(`Error al actualizar usuario`, error);
    throw error;
  }
};
