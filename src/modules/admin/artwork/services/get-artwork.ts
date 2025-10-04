import { prisma } from "@/lib/prisma";
import { ArtworkMapper } from "../mappers";
import { ArtworkEntity } from "../interfaces";

export const getArtworkById = async (
  id: number
): Promise<ArtworkEntity | null> => {
  try {
    const artwork = await prisma.artwork.findFirst({
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
      where: { id },
    });

    if (!artwork) return null;

    return ArtworkMapper.toDTO(artwork);
  } catch (error) {
    console.error(`Error al obtener la obra de arte con id ${id}:`, error);
    throw error;
  }
};
