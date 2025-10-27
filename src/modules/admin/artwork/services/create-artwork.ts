import { prisma } from "@/lib/prisma";
import { createArtworkDto, CreateArtworkDto } from "../dto/artwork.dto";
import { ArtworkEntity } from "../interfaces";
import { ArtworkMapper } from "../mappers";

export const createArtworkService = async (
  artwork: CreateArtworkDto
): Promise<ArtworkEntity> => {
  if (
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
    const newArtwork = createArtworkDto.parse(artwork);
    const createdArtwork = await prisma.artwork.create({
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
    return ArtworkMapper.toDTO(createdArtwork);
  } catch (error) {
    console.error("Error al crear la obra de arte", error);
    throw `Error al crear la obra de arte: ${error}`;
  }
};
