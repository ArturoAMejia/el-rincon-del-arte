import { prisma } from "@/lib/prisma";
import { ArtistMapper } from "@/modules/admin/artist/mappers";

export const getArtistById = async (id: number) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!artist) return null;
    return ArtistMapper.toDTO(artist);
  } catch (error) {
    console.error("Error fetching artist by id:", error);
    throw new Error(String(error));
  }
};
