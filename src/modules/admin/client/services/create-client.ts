import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import {
  createClientDto,
  CreateClientDto,
} from "@/modules/admin/client/dto/client.dto";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientMapper } from "@/modules/admin/client/mappers";
import { generatePassword } from "@/modules/auth/services/generate-password";
import { sendUserCredentialsEmail } from "@/modules/email/services/send-email";
import { createPersonService } from "@/modules/person/services/create-person";

export const createClientService = async (
  client: CreateClientDto
): Promise<ClientEntity> => {
  try {
    const newClient = createClientDto.parse(client);

    const fullName =
      `${newClient.person.name} ${newClient.person.last_name_business_name}`.trim();
    const email = newClient.person.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Ya existe un usuario con este email");
    }

    const createdPerson = await createPersonService({
      ...newClient.person,
      email,
    });

    const password = generatePassword();

    await auth.api.createUser({
      body: {
        email,
        password,
        name: fullName,
        role: "client",
      },
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado tras su creación");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { personId: createdPerson.id, stateId: 1 },
    });

    try {
      await sendUserCredentialsEmail({
        to: email,
        name: fullName,
        password,
      });
    } catch (err) {
      console.error("Error sending credentials email:", err);
    }

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
