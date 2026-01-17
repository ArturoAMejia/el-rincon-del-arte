import { prisma } from "@/lib/prisma";

export const reactivateArtistService = async (id: number): Promise<void> => {
  try {
    await prisma.artist.update({
      where: { id },
      data: {
        state_id: 1, // Active
      },
    });
  } catch (error) {
    console.error("Error reactivating artist:", error);
    throw new Error(String(error));
  }
};
