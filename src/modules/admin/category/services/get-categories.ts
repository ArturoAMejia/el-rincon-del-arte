import { prisma } from "@/lib/prisma";
import { CategoryMapper } from "../mappers";
import { CategoryEntity } from "../interfaces";

export const getCategories = async (): Promise<CategoryEntity[] | []> => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) return [];
    return categories.map(CategoryMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener las categorías`, error);
    throw error;
  }
};
