import { prisma } from "@/lib/prisma";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";

export const getClientById = async (
  id: number
): Promise<ClientEntity | null> => {
  try {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return null;
    return ClientMapper.toDTO(client);
  } catch (error) {
    console.error("Error fetching client by id:", error);
    throw new Error(String(error));
  }
};
