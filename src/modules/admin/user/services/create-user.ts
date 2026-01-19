import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import {
  CreateUserDto,
  createUserDto,
} from "@/modules/admin/user/dto/user.dto";
import { UserEntity } from "@/modules/admin/user/interfaces";
import { UserMapper } from "@/modules/admin/user/mappers";
import { createPersonService } from "@/modules/person/services/create-person";

export const createUserService = async (
  data: CreateUserDto
): Promise<UserEntity> => {
  try {
    const parsed = createUserDto.parse(data);

    // create person first
    const createdPerson = await createPersonService(parsed.person);

    await auth.api.createUser({
      body: {
        email: parsed.email,
        password: "defaultPassword123",
        name: parsed.name,
        role: "user",
        data: {
          personId: createdPerson.id,
          stateId: 1,
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: parsed.email,
      },
      include: {
        person: true,
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return UserMapper.toDTO(user);
  } catch (error) {
    console.error(`Error al crear usuario`, error);
    throw error;
  }
};
