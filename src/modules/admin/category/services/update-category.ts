import { prisma } from "@/lib/prisma";
import { updateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { CategoryEntity } from "../interfaces";
import { CategoryMapper } from "../mappers/category.mapper";

export const updateCategoryService = async (
  id: number,
  category: UpdateCategoryDto
): Promise<CategoryEntity> => {
  const exists = await prisma.category.findUnique({ where: { id } });

  if (!exists) {
    throw new Error("Categoría no encontrada");
  }

  try {
    const updatedCategory = updateCategoryDto.parse(category);

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: updatedCategory.name,
      },
    });

    return CategoryMapper.toDTO(updated);
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw `Error al actualizar la categoría: ${error}`;
  }
};
