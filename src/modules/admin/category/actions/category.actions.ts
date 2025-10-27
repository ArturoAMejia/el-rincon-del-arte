import { CategoryEntity } from "../interfaces";
import { getCategories } from "../services";

export const getCategoriesAction = async (): Promise<{
  success: boolean;
  data?: CategoryEntity[];
  error?: string;
}> => {
  try {
    // Get all categories
    const categories = await getCategories();

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Error al obtener las categorías:", error);

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
