import { prisma } from "@/lib/prisma";
import { CollectionMapper } from "../mappers";
import { CollectionEntity } from "../interfaces";
import { CreateCollectionDto } from "../dto";

export const createCollection = async (data: CreateCollectionDto): Promise<CollectionEntity> => {
  try {
    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        description: data.description,
        state_id: 1, // Default to active state
      },
    });

    return CollectionMapper.toDTO(collection);
  } catch (error) {
    console.error(`Error al crear la colección`, error);
    throw error;
  }
};
