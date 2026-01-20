"use server";

import { cacheTag, updateTag } from "next/cache";
import { ArtistEntity } from "../interfaces";
import {
  getArtists,
  createArtistService,
  updateArtistService,
  deactivateArtistService,
  reactivateArtistService,
  getArtistById,
} from "../services";
import {
  CreateArtistDto,
  UpdateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";

export const createArtistAction = async (
  formData: CreateArtistDto
): Promise<{ success: boolean; data?: ArtistEntity; error?: string }> => {
  try {
    const newArtist = await createArtistService(formData);
    updateTag("artists");
    return { success: true, data: newArtist };
  } catch (error) {
    console.error("Error creating artist:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const getArtistsAction = async (): Promise<{
  success: boolean;
  data: ArtistEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("artists");
  try {
    // Get all artists
    const artists = await getArtists();

    return {
      success: true,
      data: artists,
    };
  } catch (error) {
    console.error("Error al obtener los artistas:", error);

    if (error instanceof Error) {
      return {
        data: [],
        success: false,
        error: error.message,
      };
    }

    return {
      data: [],
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const getArtistByIdAction = async (
  id: number
): Promise<{
  success: boolean;
  data?: ArtistEntity | null;
  error?: string;
}> => {
  try {
    const artist = await getArtistById(id);
    return { success: true, data: artist };
  } catch (error) {
    console.error("Error fetching artist:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const updateArtistAction = async (
  id: number,
  formData: UpdateArtistDto
): Promise<{ success: boolean; data?: ArtistEntity; error?: string }> => {
  try {
    const updated = await updateArtistService({ ...formData, id });
    updateTag("artists");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating artist:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const deactivateArtistAction = async (
  id: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    await deactivateArtistService(id);
    updateTag("artists");
    return { success: true };
  } catch (error) {
    console.error("Error deactivating artist:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const reactivateArtistAction = async (
  id: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    await reactivateArtistService(id);
    updateTag("artists");
    return { success: true };
  } catch (error) {
    console.error("Error reactivating artist:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
};
