import { z } from "zod";

// phone: allow common separators (spaces, dashes, parens) but validate
// against digits with an optional leading + after cleaning.
const phoneRegex = /^\+?\d+$/;

export const createPersonDto = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  last_name_business_name: z
    .string()
    .min(1, "El apellido o razón social es requerido"),
  id_ruc: z.string().min(1, "El documento (RUC/Cédula) es requerido"),
  phone_number: z
    .string()
    .optional()
    .nullable()
    .refine((val) => {
      if (val === null || val === undefined || val === "") return true;
      const cleaned = String(val).replace(/[^\d+]/g, "");
      return phoneRegex.test(cleaned);
    }, { message: "Teléfono inválido" }),
  email: z.string().email("Email inválido"),
  birthday: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

export type CreatePersonDto = z.infer<typeof createPersonDto>;

export const updatePersonDto = createPersonDto.extend({
  id: z.number({ message: "El id de la persona es obligatorio" }),
});

export type UpdatePersonDto = z.infer<typeof updatePersonDto>;
