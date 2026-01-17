import { prisma } from "@/lib/prisma";
import {
  createArtistDto,
  CreateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistMapper } from "@/modules/admin/artist/mappers";
import { createPersonService } from "@/modules/person/services/create-person";

export const createArtistService = async (
  artist: CreateArtistDto
): Promise<ArtistEntity> => {
  try {
    const newArtist = createArtistDto.parse(artist);
    // First create the person via the global service
    const createdPerson = await createPersonService(newArtist.person);

    const created = await prisma.artist.create({
      data: {
        person_id: createdPerson.id,
        bio: newArtist.bio ?? "",
        style: newArtist.style ?? "",
        image: "", // Required by DB
        state_id: 1, // Active by default
      },
    });

    // include person relation for mapping
    const artistWithPerson = await prisma.artist.findUnique({
      where: { id: created.id },
      include: { person: true },
    });
    if (!artistWithPerson) throw new Error("Error fetching created artist");
    return ArtistMapper.toDTO(artistWithPerson);
  } catch (error) {
    console.error("Error creating artist:", error);
    throw new Error(String(error));
  }
};
