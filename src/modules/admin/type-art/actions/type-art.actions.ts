import { TypeArtEntity } from "../interfaces";
import { getTypesArt } from "../services";

export const getTypesArtAction = async (): Promise<{
  success: boolean;
  data?: TypeArtEntity[];
  error?: string;
}> => {
  try {
    // Get all types of art
    const typesArt = await getTypesArt();

    return {
      success: true,
      data: typesArt,
    };
  } catch (error) {
    console.error("Error al obtener los tipos de arte:", error);

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
