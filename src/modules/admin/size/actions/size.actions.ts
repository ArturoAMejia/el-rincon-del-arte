import { SizeEntity } from "../interfaces";
import { getSizes } from "../services";

export const getSizesAction = async (): Promise<{
  success: boolean;
  data?: SizeEntity[];
  error?: string;
}> => {
  try {
    // Get all sizes
    const sizes = await getSizes();

    return {
      success: true,
      data: sizes,
    };
  } catch (error) {
    console.error("Error al obtener las tallas:", error);

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
