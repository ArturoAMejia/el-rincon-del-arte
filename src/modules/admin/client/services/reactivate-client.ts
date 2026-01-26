import { prisma } from "@/lib/prisma";

export const reactivateClientService = async (id: number): Promise<void> => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
      include: { person: true },
    });

    if (!client) throw new Error("Client not found");

    await prisma.$transaction(async (tx) => {
      // Reactivate client
      await tx.client.update({ where: { id }, data: { state_id: 1 } });

      // Reactivate related person and any users linked to that person (if any)
      if (client.person) {
        await tx.person.update({
          where: { id: client.person.id },
          data: { state_id: 1 },
        });
        await tx.user.updateMany({
          where: { personId: client.person.id },
          data: { stateId: 1 },
        });
      }
    });
  } catch (error) {
    console.error("Error reactivating client:", error);
    throw new Error(String(error));
  }
};
