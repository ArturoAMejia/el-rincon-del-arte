import { prisma } from "@/lib/prisma";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";

export const getClientByUserId = async (
  userId: string
): Promise<ClientEntity | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    const client = await prisma.client.findFirst({
      where: { person_id: user?.personId || undefined },
    });

    if (!client) return null;

    return ClientMapper.toDTO(client);
  } catch (error) {
    console.error("Error fetching client by id:", error);
    throw new Error(String(error));
  }
};
