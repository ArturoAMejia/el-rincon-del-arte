import { z } from "zod";
import {
  createPersonDto,
  updatePersonDto,
} from "@/modules/person/dto/person.dto";

export const createArtistDto = z.object({
  person: createPersonDto,
  bio: z.string().optional().nullable(),
  style: z.string().optional().nullable(),
});

export type CreateArtistDto = z.infer<typeof createArtistDto>;

export const updateArtistDto = z.object({
  id: z.number({ message: "El id es obligatorio" }),
  person_id: z.number({ message: "El id de la persona es requerido" }),
  person: updatePersonDto,
  bio: z.string().optional().nullable(),
  style: z.string().optional().nullable(),
});

export type UpdateArtistDto = z.infer<typeof updateArtistDto>;
