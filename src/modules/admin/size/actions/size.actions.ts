"use server";

import { cacheTag, updateTag } from "next/cache";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import {
  getSizes,
  getSizeById,
  createSizeService,
  updateSizeService,
  deactivateSizeService,
} from "@/modules/admin/size/services";
import {
  CreateSizeDto,
  UpdateSizeDto,
} from "@/modules/admin/size/dto/size.dto";

export async function createSizeAction(
  formData: CreateSizeDto
): Promise<{ success: boolean; data?: SizeEntity; error?: string }> {
  try {
    const newSize = await createSizeService(formData);

    updateTag("sizes");

    return {
      success: true,
      data: newSize,
    };
  } catch (error) {
    console.error("Error creating size:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getSizesAction(): Promise<{
  success: boolean;
  data: SizeEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("sizes");

  try {
    const sizes = await getSizes();
    return { success: true, data: sizes };
  } catch (error) {
    console.error("Error fetching sizes:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message, data: [] };
    }
    return { success: false, error: "An unexpected error occurred", data: [] };
  }
}

export async function getSizeByIdAction(id: number): Promise<{
  success: boolean;
  data?: SizeEntity | null;
  error?: string;
}> {
  try {
    const size = await getSizeById(id);
    return { success: true, data: size };
  } catch (error) {
    console.error("Error fetching size:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateSizeAction(
  formData: UpdateSizeDto
): Promise<{ success: boolean; data?: SizeEntity; error?: string }> {
  try {
    const updated = await updateSizeService(formData);

    updateTag("sizes");

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating size:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deactivateSizeAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deactivateSizeService(id);

    updateTag("sizes");

    return { success: true };
  } catch (error) {
    console.error("Error deactivating size:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}
