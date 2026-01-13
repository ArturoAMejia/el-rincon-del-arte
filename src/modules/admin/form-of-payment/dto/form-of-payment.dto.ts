import * as z from "zod";

export const createFormOfPaymentDto = z.object({
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
});

export type CreateFormOfPaymentDto = z.infer<typeof createFormOfPaymentDto>;

export const updateFormOfPaymentDto = z.object({
  id: z.number("El id es obligatorio"),
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
});

export type UpdateFormOfPaymentDto = z.infer<typeof updateFormOfPaymentDto>;
