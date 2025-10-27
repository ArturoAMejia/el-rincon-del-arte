import { prisma } from "@/lib/prisma";
import { createCategoryDto, CreateCategoryDto } from "../dto/category.dto";
import { CategoryEntity } from "../interfaces";
import { CategoryMapper } from "../mappers/category.mapper";

export const createCategoryService = async (
  category: CreateCategoryDto
): Promise<CategoryEntity> => {
  if (!category.name) {
    throw new Error("El nombre es obligatorio");
  }

  try {
    const newCategory = createCategoryDto.parse(category);

    const created = await prisma.category.create({
      data: {
        name: newCategory.name,
      },
    });

    return CategoryMapper.toDTO(created);
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw `Error al crear la categoría: ${error}`;
  }
};
