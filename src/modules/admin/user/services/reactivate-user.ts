import { prisma } from "@/lib/prisma";

export const reactivateUserService = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!user) throw new Error("User not found");

    await prisma.$transaction(async (tx) => {
      // Reactivate user
      await tx.user.update({ where: { id }, data: { stateId: 1 } });

      // Reactivate related person and any other users linked to that person
      if (user.person) {
        await tx.person.update({
          where: { id: user.person.id },
          data: { state_id: 1 },
        });
        await tx.user.updateMany({
          where: { personId: user.person.id },
          data: { stateId: 1 },
        });
      }
    });
  } catch (error) {
    console.error(`Error al reactivar usuario`, error);
    throw error;
  }
};
