"use server";

import { cacheTag, updateTag } from "next/cache";
import { CategoryEntity } from "../interfaces";
import {
  getCategories,
  createCategoryService,
  updateCategoryService,
  deactivateCategoryService,
} from "../services";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

export const getCategoriesAction = async (): Promise<{
  success: boolean;
  data?: CategoryEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("categories");
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

export async function createCategoryAction(
  formData: CreateCategoryDto
): Promise<{ success: boolean; data?: CategoryEntity; error?: string }> {
  try {
    const newCategory = await createCategoryService(formData);

    updateTag("categories");

    return {
      success: true,
      data: newCategory,
    };
  } catch (error) {
    console.error("Error creando categoría:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateCategoryAction(
  id: number,
  formData: UpdateCategoryDto
): Promise<{ success: boolean; data?: CategoryEntity; error?: string }> {
  try {
    const updated = await updateCategoryService(id, formData);

    updateTag("categories");

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating category:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deactivateCategory(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deactivateCategoryService(id);

    updateTag("categories");

    return { success: true };
  } catch (error) {
    console.error("Error al desactivar la categoría:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
