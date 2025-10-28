"use server";

import { CollectionEntity } from "../interfaces";
import {
  getCollections,
  createCollection,
  updateCollection,
  deactivateCollection,
} from "../services";
import { CreateCollectionDto, UpdateCollectionDto } from "../dto";
import { cacheTag, updateTag } from "next/cache";

export const getCollectionsAction = async (): Promise<{
  success: boolean;
  data?: CollectionEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("collections");
  try {
    // Get all collections
    const collections = await getCollections();

    return {
      success: true,
      data: collections,
    };
  } catch (error) {
    console.error("Error al obtener las colecciones:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const createCollectionAction = async (
  data: CreateCollectionDto
): Promise<{
  success: boolean;
  data?: CollectionEntity;
  error?: string;
}> => {
  try {
    const collection = await createCollection(data);

    updateTag("collections");

    return {
      success: true,
      data: collection,
    };
  } catch (error) {
    console.error("Error al crear la colección:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const updateCollectionAction = async (
  id: number,
  data: UpdateCollectionDto
): Promise<{
  success: boolean;
  data?: CollectionEntity;
  error?: string;
}> => {
  try {
    const collection = await updateCollection(id, data);

    updateTag("collections");

    return {
      success: true,
      data: collection,
    };
  } catch (error) {
    console.error("Error al actualizar la colección:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const deactivateCollectionAction = async (
  id: number
): Promise<{
  success: boolean;
  data?: CollectionEntity;
  error?: string;
}> => {
  try {
    const collection = await deactivateCollection(id);

    updateTag("collections");

    return {
      success: true,
      data: collection,
    };
  } catch (error) {
    console.error("Error al desactivar la colección:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};
