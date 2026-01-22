import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import {
  createArtistDto,
  CreateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistMapper } from "@/modules/admin/artist/mappers";
import { ARTIST_CLIENT_ROLE } from "@/modules/admin/artist/constants";
import { generatePassword } from "@/modules/auth/services/generate-password";
import { sendUserCredentialsEmail } from "@/modules/email/services/send-email";
import { createPersonService } from "@/modules/person/services/create-person";

enum ArtistState {
  Active = 1,
}

export const createArtistService = async (
  artist: CreateArtistDto
): Promise<ArtistEntity> => {
  try {
    const newArtist = createArtistDto.parse(artist);
    
    // Normalize email to ensure consistency across User and Person records
    const email = newArtist.person.email.trim().toLowerCase();
    
    // First create the person via the global service with normalized email
    const createdPerson = await createPersonService({
      ...newArtist.person,
      email,
    });

    const fullName = `${newArtist.person.name} ${newArtist.person.last_name_business_name}`.trim();

    // Check if user exists BEFORE creating the person record to avoid data inconsistency
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Ya existe un usuario con este email");
    }

    // Now create the person via the global service
    const createdPerson = await createPersonService(newArtist.person);

    const password = generatePassword();

    await auth.api.createUser({
      body: {
        email,
        password,
        name: fullName,
        role: ARTIST_CLIENT_ROLE,
      },
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado tras su creación");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { personId: createdPerson.id, stateId: 1 },
    });

    try {
      await sendUserCredentialsEmail({
        to: email,
        name: fullName,
        password,
      });
    } catch (err) {
      console.error("Error sending credentials email:", err);
    }

    const created = await prisma.artist.create({
      data: {
        person_id: createdPerson.id,
        bio: newArtist.bio ?? "",
        style: newArtist.style ?? "",
        image: "", // Required by DB
        state_id: ArtistState.Active, // Active by default
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
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error creating artist: ${String(error)}`);
  }
};
