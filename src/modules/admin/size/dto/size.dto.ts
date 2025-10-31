import { z } from "zod";

export const createSizeDto = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

export type CreateSizeDto = z.infer<typeof createSizeDto>;

export const updateSizeDto = createSizeDto.extend({
  id: z.number("El id es obligatorio"),
});

export type UpdateSizeDto = z.infer<typeof updateSizeDto>;
