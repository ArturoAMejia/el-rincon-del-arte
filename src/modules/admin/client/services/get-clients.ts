import { prisma } from "@/lib/prisma";
import { ClientEntity } from "../interfaces";
import { ClientMapper } from "../mappers";

export const getClients = async (): Promise<ClientEntity[] | []> => {
  try {
    const clients = await prisma.client.findMany({
      where: { state_id: 1 },
      include: { person: true },
    });

    if (!clients) return [];
    return clients.map(ClientMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener los clientes`, error);
    throw error;
  }
};
