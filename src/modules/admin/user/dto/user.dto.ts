import { z } from "zod";
import {
  createPersonDto,
  updatePersonDto,
} from "@/modules/person/dto/person.dto";

export const createUserDto = z.object({
  person: createPersonDto,
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El email no es válido"),
  role: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateUserDto = z.object({
  id: z.string({ message: "El id es obligatorio" }),
  person_id: z.number({ message: "El id de la persona es requerido" }),
  person: updatePersonDto,
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El email no es válido"),
});

export type UpdateUserDto = z.infer<typeof updateUserDto>;
