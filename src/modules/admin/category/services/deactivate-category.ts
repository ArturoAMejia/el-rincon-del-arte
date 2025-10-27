import { prisma } from "@/lib/prisma";

export const deactivateCategoryService = async (id: number): Promise<void> => {
  const exists = await prisma.category.findUnique({ where: { id } });

  if (!exists) {
    throw new Error("Categoría no encontrada");
  }

  await prisma.category.update({
    where: { id },
    data: { state_id: 2 },
  });

  return;
};
