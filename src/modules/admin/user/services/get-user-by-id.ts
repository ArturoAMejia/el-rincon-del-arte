import { prisma } from "@/lib/prisma";
import { UserMapper } from "@/modules/admin/user/mappers";
import { UserEntity } from "@/modules/admin/user/interfaces";

export const getUserById = async (id: string): Promise<UserEntity | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!user) return null;
    return UserMapper.toDTO(user);
  } catch (error) {
    console.error(`Error al obtener el usuario por id`, error);
    throw error;
  }
};
