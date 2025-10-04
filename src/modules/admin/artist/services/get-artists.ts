import { prisma } from "@/lib/prisma";

import { ArtistMapper } from "../mappers";
import { ArtistEntity } from "../interfaces";

export const getArtists = async (): Promise<ArtistEntity[] | []> => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        person: true,
      },
    });

    if (!artists) return [];
    return artists.map(ArtistMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener los artistas`, error);
    throw error;
  }
};
