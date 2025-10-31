import { prisma } from "@/lib/prisma";

export const deactivateSizeService = async (id: number): Promise<void> => {
  try {
    // Set a deactivated state id (2) — adjust if your app uses a different id
    await prisma.size.update({ where: { id }, data: { state_id: 2 } });
  } catch (error) {
    console.error("Error deactivating size:", error);
    throw new Error(String(error));
  }
};
