import { prisma } from "@/lib/prisma";
import { TypeArtMapper } from "../mappers";
import { TypeArtEntity } from "../interfaces";

export const getTypesArt = async (): Promise<TypeArtEntity[] | []> => {
  try {
    const typesArt = await prisma.type_art.findMany();

    if (!typesArt) return [];
    return typesArt.map(TypeArtMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener los tipos de arte`, error);
    throw error;
  }
};
