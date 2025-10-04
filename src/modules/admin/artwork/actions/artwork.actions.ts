"use server";

import { getArtworkById, getArtworks } from "../services";
import { ArtworkEntity } from "../interfaces";
import { createArtworkService } from "../services/create-artwork";
import { CreateArtworkDto, UpdateArtworkDto } from "../dto/artwork.dto";
import { revalidatePath } from "next/cache";
import { updateArtworkService } from "../services/update-artwork";

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

    revalidatePath("/admin/obras-de-arte");

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
  data?: ArtworkEntity[];
  error?: string;
}> {
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
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
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

    revalidatePath("/admin/obras-de-arte");

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
