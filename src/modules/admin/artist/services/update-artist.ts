import { prisma } from "@/lib/prisma";
import {
  updateArtistDto,
  UpdateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistMapper } from "@/modules/admin/artist/mappers";
import { ARTIST_CLIENT_ROLE } from "@/modules/admin/artist/constants";

export const updateArtistService = async (
  artist: UpdateArtistDto
): Promise<ArtistEntity> => {
  try {
    const parsed = updateArtistDto.parse(artist);
    
    // Normalize email once for consistent use
    const fullName = `${parsed.person.name} ${parsed.person.last_name_business_name}`.trim();
    const email = parsed.person.email.trim().toLowerCase();
    
    // Update person first
    await prisma.person.update({
      where: { id: parsed.person_id },
      data: {
        name: parsed.person.name,
        last_name_business_name: parsed.person.last_name_business_name,
        id_ruc: parsed.person.id_ruc,
        phone_number: parsed.person.phone_number ?? "",
        email,
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

    const linkedUser = await prisma.user.findFirst({
      where: { personId: parsed.person_id },
    });

    if (linkedUser) {
      await prisma.user.update({
        where: { id: linkedUser.id },
        data: {
          name: fullName,
          email,
          role: ARTIST_CLIENT_ROLE,
        },
      });
    }

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
