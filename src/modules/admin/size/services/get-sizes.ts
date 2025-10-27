import { prisma } from "@/lib/prisma";
import { SizeMapper } from "../mappers";
import { SizeEntity } from "../interfaces";

export const getSizes = async (): Promise<SizeEntity[] | []> => {
  try {
    const sizes = await prisma.size.findMany();

    if (!sizes) return [];
    return sizes.map(SizeMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener las tallas`, error);
    throw error;
  }
};
