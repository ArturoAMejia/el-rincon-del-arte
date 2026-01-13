import { z } from "zod";
import {
  createPersonDto,
  updatePersonDto,
} from "@/modules/person/dto/person.dto";

export const createClientDto = z.object({
  person: createPersonDto,
  client_type: z.string().min(1, "El tipo de cliente es requerido"),
  gender: z.string().min(1, "El género es requerido"),
});

export type CreateClientDto = z.infer<typeof createClientDto>;

export const updateClientDto = z.object({
  id: z.number({ message: "El id es obligatorio" }),
  person_id: z.number({ message: "El id de la persona es requerido" }),
  person: updatePersonDto,
  client_type: z.string().min(1, "El tipo de cliente es requerido"),
  gender: z.string().min(1, "El género es requerido"),
});

export type UpdateClientDto = z.infer<typeof updateClientDto>;
