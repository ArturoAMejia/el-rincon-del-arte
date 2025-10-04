import { ArtistEntity } from "../interfaces";
import { getArtists } from "../services";

export const getArtistsAction = async (): Promise<{
  success: boolean;
  data?: ArtistEntity[];
  error?: string;
}> => {
  try {
    // Get all artists
    const artists = await getArtists();

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
