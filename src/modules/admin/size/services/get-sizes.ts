import { prisma } from "@/lib/prisma";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { SizeMapper } from "@/modules/admin/size/mappers";

export const getSizes = async (): Promise<SizeEntity[]> => {
  try {
    const sizes = await prisma.size.findMany({
      where: { state_id: 1 }, // only active sizes
      orderBy: { id: "asc" },
    });

    return sizes.map((s) => SizeMapper.toDTO(s));
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw new Error(String(error));
  }
};
