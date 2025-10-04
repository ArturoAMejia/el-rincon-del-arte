import { prisma } from "@/lib/prisma";
import { ArtworkMapper } from "../mappers";
import { ArtworkEntity } from "../interfaces";

export const getArtworks = async (): Promise<ArtworkEntity[]> => {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        category: { select: { name: true } },
        collection: { select: { name: true } },
        size: { select: { name: true } },
        artist: {
          select: {
            person: { select: { name: true, last_name_business_name: true } },
          },
        },
      },
    });
    return artworks.map((artwork) => ArtworkMapper.toDTO(artwork));
  } catch (error) {
    console.error("Error al obtener las obras de arte:", error);
    throw error;
  }
};
