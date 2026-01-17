import { prisma } from "@/lib/prisma";

export const deactivateArtistService = async (id: number): Promise<void> => {
  try {
    await prisma.artist.update({
      where: { id },
      data: {
        state_id: 2, // Deactive
      },
    });
  } catch (error) {
    console.error("Error deactivating artist:", error);
    throw new Error(String(error));
  }
};
