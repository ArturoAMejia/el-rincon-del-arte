import { prisma } from "@/lib/prisma";
import {
  createClientDto,
  CreateClientDto,
} from "@/modules/admin/client/dto/client.dto";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";
import { createPersonService } from "@/modules/person/services/create-person";

export const createClientService = async (
  client: CreateClientDto
): Promise<ClientEntity> => {
  try {
    const newClient = createClientDto.parse(client);
    // First create the person via the global service
    const createdPerson = await createPersonService(newClient.person);

    const created = await prisma.client.create({
      data: {
        person_id: createdPerson.id,
        client_type: newClient.client_type,
        gender: newClient.gender,
        state_id: 1,
      },
    });

    // include person relation for mapping
    const clientWithPerson = await prisma.client.findUnique({
      where: { id: created.id },
      include: { person: true },
    });
    if (!clientWithPerson) throw new Error("Error fetching created client");
    return ClientMapper.toDTO(clientWithPerson);
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error(String(error));
  }
};
