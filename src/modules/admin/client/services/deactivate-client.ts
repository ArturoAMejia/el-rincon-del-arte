import { prisma } from "@/lib/prisma";

export const deactivateClientService = async (id: number): Promise<void> => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
      include: { person: true },
    });

    if (!client) throw new Error("Client not found");

    await prisma.$transaction(async (tx) => {
      // Deactivate client
      await tx.client.update({ where: { id }, data: { state_id: 2 } });

      // If the client has a related person, deactivate the person
      if (client.person) {
        await tx.person.update({
          where: { id: client.person.id },
          data: { state_id: 2 },
        });

        // Deactivate any user(s) associated with that person (if any)
        await tx.user.updateMany({
          where: { personId: client.person.id },
          data: { stateId: 2 },
        });
      }
    });
  } catch (error) {
    console.error("Error deactivating client:", error);
    throw new Error(String(error));
  }
};
