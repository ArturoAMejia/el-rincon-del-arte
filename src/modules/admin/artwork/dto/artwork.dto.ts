import * as z from "zod";

export const createArtworkDto = z.object({
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
  description: z
    .string("La descripción es obligatoria")
    .min(1, "La descripción debe tener al menos 1 carácter")
    .max(1000, "La descripción debe tener como máximo 1000 caracteres"),
  dimension: z
    .string("La dimensión es obligatoria")
    .min(1, "La dimensión debe tener al menos 1 carácter")
    .max(30, "La dimensión debe tener como máximo 30 caracteres"),
  price: z
    .string("El precio es obligatorio")
    .min(0, "El precio debe ser mayor o igual a 0"),
  artist_id: z
    .string("El artista es obligatorio")
    .min(1, "Debe de escoger al menos un artista"),
  category_id: z
    .string("La categoría es obligatoria")
    .min(1, "Debe de escoger al menos una categoría"),
  collection_id: z
    .string("La colección es obligatoria")
    .min(1, "Debe de escoger al menos una colección"),
  size_id: z
    .string("El tamaño es obligatorio")
    .min(1, "Debe de escoger al menos un tamaño"),
  type_art_id: z
    .string("El tipo de arte es obligatorio")
    .min(1, "Debe de escoger al menos un tipo de arte"),
});

export type CreateArtworkDto = z.infer<typeof createArtworkDto>;

export const updateArtworkDto = z.object({
  id: z.number("El id es obligatorio"),
  name: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),
  description: z
    .string("La descripción es obligatoria")
    .min(1, "La descripción debe tener al menos 1 carácter")
    .max(1000, "La descripción debe tener como máximo 1000 caracteres"),
  dimension: z
    .string("La dimensión es obligatoria")
    .min(1, "La dimensión debe tener al menos 1 carácter")
    .max(30, "La dimensión debe tener como máximo 30 caracteres"),
  price: z
    .string("El precio es obligatorio")
    .min(0, "El precio debe ser mayor o igual a 0"),
  artist_id: z
    .string("El artista es obligatorio")
    .min(1, "Debe de escoger al menos un artista"),
  category_id: z
    .string("La categoría es obligatoria")
    .min(1, "Debe de escoger al menos una categoría"),
  collection_id: z
    .string("La colección es obligatoria")
    .min(1, "Debe de escoger al menos una colección"),
  size_id: z
    .string("El tamaño es obligatorio")
    .min(1, "Debe de escoger al menos un tamaño"),
  type_art_id: z
    .string("El tipo de arte es obligatorio")
    .min(1, "Debe de escoger al menos un tipo de arte"),
});

export type UpdateArtworkDto = z.infer<typeof updateArtworkDto>;
