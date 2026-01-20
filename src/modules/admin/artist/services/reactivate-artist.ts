import { prisma } from "@/lib/prisma";

const ARTIST_STATE = {
  ACTIVE: 1,
};

export const reactivateArtistService = async (id: number): Promise<void> => {
  try {
    await prisma.artist.update({
      where: { id },
      data: {
        state_id: ARTIST_STATE.ACTIVE, // Active
      },
    });
  } catch (error) {
    console.error("Error reactivating artist:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error reactivating artist: ${String(error)}`);
  }
};
