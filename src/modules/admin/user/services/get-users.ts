import { prisma } from "@/lib/prisma";
import { UserMapper } from "@/modules/admin/user/mappers";
import { UserEntity } from "@/modules/admin/user/interfaces";

export const getUsers = async (): Promise<UserEntity[]> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        person: true,
        state: true,
      },
      orderBy: { name: "asc" },
    });
    if (!users) return [];

    console.log(users);

    return users.map((u) => UserMapper.toDTO(u));
  } catch (error) {
    console.error(`Error al obtener los usuarios`, error);
    throw error;
  }
};
