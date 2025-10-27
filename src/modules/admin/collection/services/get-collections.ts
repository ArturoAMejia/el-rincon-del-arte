import { prisma } from "@/lib/prisma";
import { CollectionMapper } from "../mappers";
import { CollectionEntity } from "../interfaces";

export const getCollections = async (): Promise<CollectionEntity[] | []> => {
  try {
    const collections = await prisma.collection.findMany();

    if (!collections) return [];
    return collections.map(CollectionMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener las colecciones`, error);
    throw error;
  }
};
