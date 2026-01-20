import { prisma } from "@/lib/prisma";

enum ArtistState {
  Inactive = 2,
}

export const deactivateArtistService = async (id: number): Promise<void> => {
  try {
    await prisma.artist.update({
      where: { id },
      data: {
        state_id: ArtistState.Inactive, // Inactive
      },
    });
  } catch (error) {
    console.error("Error deactivating artist:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error deactivating artist: ${String(error)}`);
  }
};
