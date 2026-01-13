import { prisma } from "@/lib/prisma";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";

export const getClients = async (): Promise<ClientEntity[]> => {
  try {
    const clients = await prisma.client.findMany({
      include: { person: true },
      orderBy: { id: "asc" },
    });

    if (!clients) return [];
    return clients.map((c) => ClientMapper.toDTO(c));
  } catch (error) {
    console.error(`Error al obtener los clientes`, error);
    throw error;
  }
};
