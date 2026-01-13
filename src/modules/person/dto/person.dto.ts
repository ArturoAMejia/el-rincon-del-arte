import { z } from "zod";

// phone: all
// ow optional leading + and digits only
const phoneRegex = /^\+?\d*$/;

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
      return phoneRegex.test(val);
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
