import { prisma } from "@/lib/prisma";

export const deactivateArtworkService = async (id: number): Promise<void> => {
  const exists = await prisma.artwork.findUnique({
    where: { id },
  });

  if (!exists) {
    throw new Error("Obra de arte no encontrada");
  }

  await prisma.artwork.update({
    where: { id },
    data: { state_id: 2 },
  });

  return;
};
