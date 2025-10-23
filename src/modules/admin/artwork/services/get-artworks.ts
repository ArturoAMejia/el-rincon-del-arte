import { prisma } from "@/lib/prisma";
import { ArtworkMapper } from "../mappers";
import { ArtworkEntity } from "../interfaces";

export const getArtworks = async (): Promise<ArtworkEntity[]> => {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        category: { select: { id: true, name: true } },
        collection: { select: { id: true, name: true } },
        type_art: { select: { id: true, name: true } },
        size: { select: { id: true, name: true } },
        artist: {
          select: {
            id: true,
            person: {
              select: { id: true, name: true, last_name_business_name: true },
            },
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
