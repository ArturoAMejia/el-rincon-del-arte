import { prisma } from "@/lib/prisma";
import { CollectionMapper } from "../mappers";
import { CollectionEntity } from "../interfaces";

export const deactivateCollection = async (
  id: number
): Promise<CollectionEntity> => {
  try {
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        state_id: 2, // Set to inactive state
      },
    });

    return CollectionMapper.toDTO(collection);
  } catch (error) {
    console.error(`Error al desactivar la colección`, error);
    throw error;
  }
};
