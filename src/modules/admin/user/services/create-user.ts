import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import {
  CreateUserDto,
  createUserDto,
} from "@/modules/admin/user/dto/user.dto";
import { UserEntity } from "@/modules/admin/user/interfaces";
import { UserMapper } from "@/modules/admin/user/mappers";
import { createPersonService } from "@/modules/person/services/create-person";
import { generatePassword } from "@/modules/auth/services/generate-password";
import { sendUserCredentialsEmail } from "@/modules/email/services/send-email";

export const createUserService = async (
  data: CreateUserDto
): Promise<UserEntity> => {
  try {
    const parsed = createUserDto.parse(data);

    // create person first
    const createdPerson = await createPersonService(parsed.person);

    // generate secure random password per user
    const password = generatePassword();

    if (createdPerson.id === null) {
      throw new Error("Error creating associated person");
    }

    await auth.api.createUser({
      body: {
        email: parsed.email,
        password,
        name: parsed.name,
        role: "client",
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

    // link person to user
    await prisma.user.update({
      where: { id: user.id },
      data: { personId: createdPerson.id, stateId: 1 },
    });

    // send credentials email (best-effort)
    try {
      await sendUserCredentialsEmail({
        to: parsed.email,
        name: parsed.name,
        password,
      });
    } catch (err) {
      console.error("Error sending credentials email:", err);
    }

    return UserMapper.toDTO(user);
  } catch (error) {
    console.error(`Error al crear usuario`, error);
    throw error;
  }
};
