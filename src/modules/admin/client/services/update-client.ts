import { prisma } from "@/lib/prisma";
import {
  updateClientDto,
  UpdateClientDto,
} from "@/modules/admin/client/dto/client.dto";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";

export const updateClientService = async (
  client: UpdateClientDto
): Promise<ClientEntity> => {
  try {
    const parsed = updateClientDto.parse(client);
    // Update person first
    await prisma.person.update({
      where: { id: parsed.person_id },
      data: {
        name: parsed.person.name,
        last_name_business_name: parsed.person.last_name_business_name,
        id_ruc: parsed.person.id_ruc,
        phone_number: parsed.person.phone_number ?? "",
        email: parsed.person.email,
        birthday: parsed.person.birthday
          ? new Date(parsed.person.birthday)
          : undefined,
        address: parsed.person.address ?? "",
      },
    });

    const updated = await prisma.client.update({
      where: { id: parsed.id },
      data: {
        client_type: parsed.client_type,
        gender: parsed.gender,
      },
    });

    // return with person
    const clientWithPerson = await prisma.client.findUnique({
      where: { id: updated.id },
      include: { person: true },
    });
    if (!clientWithPerson) throw new Error("Error fetching updated client");
    return ClientMapper.toDTO(clientWithPerson);
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error(String(error));
  }
};
