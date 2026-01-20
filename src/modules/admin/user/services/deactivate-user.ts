import { prisma } from "@/lib/prisma";

export const deactivateUserService = async (id: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!user) throw new Error("User not found");

    await prisma.$transaction(async (tx) => {
      // Deactivate user
      await tx.user.update({ where: { id }, data: { stateId: 2 } });

      // Deactivate related person and any other users linked to that person
      if (user.person) {
        await tx.person.update({
          where: { id: user.person.id },
          data: { state_id: 2 },
        });
        await tx.user.updateMany({
          where: { personId: user.person.id },
          data: { stateId: 2 },
        });
      }
    });
  } catch (error) {
    console.error("Error deactivating user:", error);
    throw new Error(
      `Error al desactivar el usuario: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
