import { prisma } from "@/lib/prisma";
import { ArtworkMapper } from "../mappers";
import { ArtworkEntity } from "../interfaces";

export const getArtworkById = async (
  id: number
): Promise<ArtworkEntity | null> => {
  try {
    const artwork = await prisma.artwork.findFirst({
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
      where: { id },
    });

    if (!artwork) return null;

    return ArtworkMapper.toDTO(artwork);
  } catch (error) {
    console.error(`Error al obtener la obra de arte con id ${id}:`, error);
    throw error;
  }
};
