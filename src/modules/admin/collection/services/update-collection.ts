import { prisma } from "@/lib/prisma";
import { CollectionMapper } from "../mappers";
import { CollectionEntity } from "../interfaces";
import { UpdateCollectionDto } from "../dto";

export const updateCollection = async (
  id: number,
  data: UpdateCollectionDto
): Promise<CollectionEntity> => {
  try {
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        // Keep existing state_id, don't update it
      },
    });

    return CollectionMapper.toDTO(collection);
  } catch (error) {
    console.error(`Error al actualizar la colección`, error);
    throw error;
  }
};
