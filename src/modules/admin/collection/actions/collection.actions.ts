import { CollectionEntity } from "../interfaces";
import { getCollections } from "../services";

export const getCollectionsAction = async (): Promise<{
  success: boolean;
  data?: CollectionEntity[];
  error?: string;
}> => {
  try {
    // Get all collections
    const collections = await getCollections();

    return {
      success: true,
      data: collections,
    };
  } catch (error) {
    console.error("Error al obtener las colecciones  :", error);

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
