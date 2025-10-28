import { z } from "zod";

export const createCollectionDto = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

export const updateCollectionDto = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

export type CreateCollectionDto = z.infer<typeof createCollectionDto>;
export type UpdateCollectionDto = z.infer<typeof updateCollectionDto>;
