import { CategoryEntity } from "../interfaces";
import { getCategories } from "../services";

export const getCategoriesAction = async (): Promise<{
  success: boolean;
  data?: CategoryEntity[];
  error?: string;
}> => {
  try {
    // Get all artists
    const artists = await getCategories();

    return {
      success: true,
      data: artists,
    };
  } catch (error) {
    console.error("Error al obtener los artistas  :", error);

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
