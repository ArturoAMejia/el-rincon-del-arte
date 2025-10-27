"use server";

import { revalidateTag, cacheTag, updateTag } from "next/cache";
import { ArtworkEntity } from "../interfaces";
import {
  getArtworkById,
  getArtworks,
  createArtworkService,
  updateArtworkService,
  deactivateArtworkService,
} from "../services";
import { CreateArtworkDto, UpdateArtworkDto } from "../dto/artwork.dto";

export async function createArtworkAction(
  formData: CreateArtworkDto
): Promise<{ success: boolean; data?: ArtworkEntity; error?: string }> {
  try {
    // Extract data from FormData
    const artworkData = {
      name: formData.name as string,
      description: formData.description as string,
      dimension: formData.dimension as string,
      price: formData.price,
      artist_id: formData.artist_id,
      collection_id: formData.collection_id,
      category_id: formData.category_id,
      type_art_id: formData.type_art_id,
      size_id: formData.size_id,
    };

    const newArtwork = await createArtworkService(artworkData);

    revalidateTag("artworks", "max");

    return {
      success: true,
      data: newArtwork,
    };
  } catch (error) {
    console.error("Error creating artwork:", error);

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
}

export async function getArtworksAction(): Promise<{
  success: boolean;
  data: ArtworkEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("artworks");
  try {
    // Get all artworks
    const artworks = await getArtworks();

    return {
      success: true,
      data: artworks,
    };
  } catch (error) {
    console.error("Error al obtener las obras de arte:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
      data: [],
    };
  }
}

export async function getArtworkByIdAction(id: number): Promise<{
  success: boolean;
  data?: ArtworkEntity | null;
  error?: string;
}> {
  try {
    // Get artwork by ID
    const artwork = await getArtworkById(id);

    return {
      success: true,
      data: artwork,
    };
  } catch (error) {
    console.error("Error fetching artwork:", error);

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
}

export async function updateArtworkAction(
  id: number,
  formData: UpdateArtworkDto
): Promise<{ success: boolean; data?: ArtworkEntity; error?: string }> {
  try {
    // Dynamically import the update service to avoid circular dependencies

    // Extract data from FormData
    const artworkData = {
      id: Number(formData.id),
      name: formData.name,
      description: formData.description,
      dimension: formData.dimension,
      price: formData.price,
      artist_id: formData.artist_id,
      collection_id: formData.collection_id,
      category_id: formData.category_id,
      type_art_id: formData.type_art_id,
      size_id: formData.size_id,
    };

    const updatedArtwork = await updateArtworkService(id, artworkData);

    revalidateTag("artworks", "max");
    return {
      success: true,
      data: updatedArtwork,
    };
  } catch (error) {
    console.error("Error updating artwork:", error);

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
}

export async function deactivateArtwork(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deactivateArtworkService(id);

    updateTag("artworks");

    return { success: true };
  } catch (error) {
    console.error("Error al desactivar la obra de arte:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
