import { prisma } from "@/lib/prisma";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { SizeMapper } from "@/modules/admin/size/mappers";

export const getSizeById = async (id: number): Promise<SizeEntity | null> => {
  try {
    const size = await prisma.size.findUnique({ where: { id } });
    if (!size) return null;
    return SizeMapper.toDTO(size);
  } catch (error) {
    console.error("Error fetching size by id:", error);
    throw new Error(String(error));
  }
};
