import * as z from "zod";

export const createCategoryDto = z.object({
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
});

export type CreateCategoryDto = z.infer<typeof createCategoryDto>;

export const updateCategoryDto = z.object({
  id: z.number("El id es obligatorio"),
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
});

export type UpdateCategoryDto = z.infer<typeof updateCategoryDto>;
