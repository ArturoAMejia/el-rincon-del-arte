import { prisma } from "@/lib/prisma";
import { updateArtworkDto, UpdateArtworkDto } from "../dto/artwork.dto";
import { ArtworkEntity } from "../interfaces";
import { ArtworkMapper } from "../mappers";

export const updateArtworkService = async (
  id: number,
  artwork: UpdateArtworkDto
): Promise<ArtworkEntity> => {
  if (
    !id ||
    !artwork.name ||
    !artwork.description ||
    !artwork.price ||
    !artwork.category_id ||
    !artwork.collection_id ||
    !artwork.dimension ||
    !artwork.size_id ||
    !artwork.artist_id
  ) {
    throw new Error("Todos los campos son obligatorios");
  }
  try {
    const newArtwork = updateArtworkDto.parse(artwork);
    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...newArtwork,
        price: parseFloat(newArtwork.price),
        artist_id: parseInt(newArtwork.artist_id),
        collection_id: parseInt(newArtwork.collection_id),
        category_id: parseInt(newArtwork.category_id),
        type_art_id: parseInt(newArtwork.type_art_id),
        size_id: parseInt(newArtwork.size_id),
      },
      include: {
        category: true,
        collection: true,
        size: true,
        artist: { include: { person: true } },
        type_art: true,
      },
    });
    return ArtworkMapper.toDTO(updatedArtwork);
  } catch (error) {
    console.error("Error al actualizar la obra de arte", error);
    throw `Error al actualizar la obra de arte: ${error}`;
  }
};
