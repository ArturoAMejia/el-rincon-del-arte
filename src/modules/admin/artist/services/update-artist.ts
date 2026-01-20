import { prisma } from "@/lib/prisma";
import {
  updateArtistDto,
  UpdateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistMapper } from "@/modules/admin/artist/mappers";

export const updateArtistService = async (
  artist: UpdateArtistDto
): Promise<ArtistEntity> => {
  try {
    const parsed = updateArtistDto.parse(artist);
    // Update person first
    await prisma.person.update({
      where: { id: parsed.person_id },
      data: {
        name: parsed.person.name,
        last_name_business_name: parsed.person.last_name_business_name,
        id_ruc: parsed.person.id_ruc,
        phone_number: parsed.person.phone_number ?? "",
        email: parsed.person.email,
        birthday: parsed.person.birthday
          ? new Date(parsed.person.birthday)
          : undefined,
        address: parsed.person.address ?? "",
      },
    });

    const updated = await prisma.artist.update({
      where: { id: parsed.id },
      data: {
        bio: parsed.bio ?? undefined,
        style: parsed.style ?? undefined,
      },
    });

    // return with person
    const artistWithPerson = await prisma.artist.findUnique({
      where: { id: updated.id },
      include: { person: true },
    });
    if (!artistWithPerson) throw new Error("Error fetching updated artist");
    return ArtistMapper.toDTO(artistWithPerson);
  } catch (error) {
    console.error("Error updating artist:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error updating artist: ${String(error)}`);
  }
};
